const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mentorme",
});

con.connect((err) => {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Successful Connection");
    createTutors();
    con.end(() => {
      if (err) {
        console.log("error:" + err.message);
      } else {
        console.log("Connection Closed");
        process.exit();
      }
    });
  }
});

const first_names = [
  "Ahmed",
  "Pratik",
  "Mohit",
  "John",
  "George",
  "Muller",
  "James",
  "Omar",
  "Hossam",
  "Donald",
];
const last_names = [
  "James",
  "Bryant",
  "Anand",
  "Trump",
  "Statiya",
  "Hill",
  "Nurmagomedov",
  "Chimaev",
  "Mcregor",
];

const createTutors = () => {
  for (let i = 0; i < 25; i++) {
    const firstname =
      first_names[Math.round(Math.random() * (first_names.length - 1))];
    const lastname =
      last_names[Math.round(Math.random() * (last_names.length - 1))];
    const is_active = Math.round(Math.random());
    const subject_id = Math.round(Math.random() * 10);
    const price = Math.round(Math.random() * 2000);
    console.log(firstname + " " + lastname);
    var sql = `INSERT INTO tutor (FIRST_NAME,LAST_NAME,IS_ACTIVE, SUBJECT_ID, PRICE) 
        VALUES ("${firstname}", "${lastname}", ${is_active},${subject_id},${price})`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

createTutors();
