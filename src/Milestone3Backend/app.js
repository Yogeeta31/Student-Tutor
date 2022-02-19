//Code Reviewed by Mohammed Afwan
//Github username: theafwan
//University email: mohammed.afwan@informatik.hs-fulda.de

const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./db");
const db = require("./db");
const indexRoute = require("./routes/index");
const messageController = require("./controllers/messageController");
const notificationController = require("./controllers/notificationController");
const http = require("http");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", indexRoute);
//*************** It's better to remove unnecessary Code*********************************
let Server = http.createServer(app);
// const io = require("socket.io")(Server, {
//   cors: {
//     origin: `*`,
//     methods: ["GET", "POST"],
//   },
// });

//******************** On this file, It would be better to create a separate file for socket instead of on main app configuration file.*********************
//*********** You could create a function which would initiate and accept websocket connections and use all the events over there.*************************
const io = require("socket.io")(Server, {
  cors: {
    origin: `${process.env.FRONTEND_PORT}`,
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});

let users = [];

io.on("connection", (socket) => {
  //login
  socket.on("username", (data) => {
    users.push({
      id: socket.id,
      userId: data.userId,
    });

    let len = users.length;
    len--;
    io.emit("userList", users, users[len].id);
  });

  socket.on("sendnotification", (data) => {
    notificationController.sendNotificationSocket(data, (result) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].userId === data.tutorId) {
          let socketid = users[i].id;
          io.to(socketid).emit("noti", [result]);
        }
      }
    });
  });

  socket.on("getnotification", (data) => {
    notificationController.getNotificationSocket(data, (result) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].userId === data.tutorId) {
          let socketid = users[i].id;
          io.to(socketid).emit("noti", result);
        }
      }
    });
  });

  //logout
  socket.on("logout", (data) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === data.id) {
        users.splice(i, 1);
      }
    }
    io.emit("exit", users);
  });
  socket.on("sendmessage", async (data) => {
    messageController.sendMessageSocket(data, (result) => {
      io.emit("output", [result]);
    });
  });
  socket.on("findmessage", async (data) => {
    messageController.getMessageScoket(data, (result) => {
      socket.emit("output", result);
    });
  });
});

Server.listen(4000, () => {
  console.log("Server started");
});
