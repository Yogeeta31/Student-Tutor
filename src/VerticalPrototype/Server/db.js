const mysql = require("mysql");
const dotenv = require("dotenv").config();

// const db = mysql.createConnection({
//   host: process.env.DBHOST,
//   user: process.env.DBUSERNAME,
//   password: process.env.DBPASSWORD,
//   database: process.env.DBNAME,
//   insecureAuth: true,
// });
const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

db.connect((err) => {
  try {
    if (err) {
      throw err;
    }
    console.log("Mysql Connected . . . .");
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = db;
