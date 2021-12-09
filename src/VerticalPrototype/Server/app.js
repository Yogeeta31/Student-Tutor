const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./db");

app.use(cors());
app.use(express.json());



app.get('/test', (req, res) => {
    res.send("Hello World");
});

app.get("/api/tutors/get", (req, res) => {
    const {name,subject} = req.body;
    let sql = `SELECT * FROM tutors WHERE name = "${name}" or subject = "${subject}"`
    dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen('4000', () => {
    console.log("Server started");
});