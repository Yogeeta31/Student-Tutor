const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mentorme",
});

con.connect((err) => {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Successful Connection");
    removeTutors();
    con.end((err) => {
      if (err) {
        console.log("error:" + err.message);
      } else {
        console.log("Connection Closed");
        process.exit();
      }
    });
  }
});

const removeTutors = () => {
  var sql = "DELETE FROM tutor";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
};
