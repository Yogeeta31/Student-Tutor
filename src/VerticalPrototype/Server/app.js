const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());



app.get('/test', (req, res) => {
    res.send("Hello World");
});

app.listen('4000', () => {
    console.log("Server started");
});