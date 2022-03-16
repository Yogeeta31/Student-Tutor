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

let Server = http.createServer(app);

const io = require("socket.io")(Server, {
  cors: {
    origin: `${process.env.FRONTEND_PORT}`,
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  //allow to connect to previous version
  allowEIO3: true,
});

io.on("connection", (socket) => {
  //login

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
