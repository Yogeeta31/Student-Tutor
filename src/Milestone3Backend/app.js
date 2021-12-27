const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./db");
const db = require("./db");
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.get("/test", (req, res) => {
    res.send("Hello World");
});


app.use('/search',searchRoutes);
app.use(authRoutes);

app.listen("4000", () => {
    console.log("Server started");
});
