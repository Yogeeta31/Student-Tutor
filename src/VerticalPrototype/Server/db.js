const mysql = require("mysql");
const dotenv = require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  insecureAuth: true,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql Connected . . . .");
});

module.exports = db;
