const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./db");

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello World");
});
app.get("/api/tutors", (req, res) => {
  let { firstName, lastName, subjectName } = req.query;
  // const { first_name, last_name, subject_name } = req.body;
  let sql = `SELECT * FROM User INNER JOIN tutor ON (tutor.USER_ID=user.USER_ID) INNER JOIN subject ON (subject.SUBJECT_ID = tutor.SUBJECT_ID) WHERE FIRST_NAME LIKE "%${firstName}%" OR LAST_NAME LIKE "%${lastName}%" OR SUBJECT_NAME LIKE "%${subjectName}%"`;
  dbConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen("4000", () => {
  console.log("Server started");
});
