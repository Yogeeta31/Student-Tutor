const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./db");

app.use(cors());
app.use(express.json());



app.get('/test', (req, res) => {
    res.send("Hello World");
});

app.get("/api/tutors/", (req, res) => {
    const {first_name, last_name,subject_name} = req.body;
    let sql = `SELECT * FROM tutor WHERE FIRST_NAME LIKE "%${first_name}%" OR LAST_NAME LIKE "%${last_name}%" `;
    dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen('4000', () => {
    console.log("Server started");
});