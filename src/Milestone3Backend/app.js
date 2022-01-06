const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./db");
const db = require("./db");
const indexRoute = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", indexRoute);

app.listen("4000", () => {
  console.log("Server started");
});
