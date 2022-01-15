const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./db");
const db = require("./db");
const indexRoute = require("./routes/index");
const http = require("http");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", indexRoute);

let Server = http.createServer(app);
const io = require("socket.io")(Server, {
  cors: {
    origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  socket.on("sendmessage", async (data) => {});
});

Server.listen(4000, () => {
  console.log("Server started");
});
