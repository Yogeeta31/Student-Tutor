const mysql = require("mysql");
const dotenv = require("dotenv").config();
const moment = require("moment");

var con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
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
  let Subjects = [
    {
      subjectName: "English",
      code: "101",
    },
    {
      subjectName: "Maths",
      code: "102",
    },
    {
      subjectName: "Physics",
      code: "103",
    },
    {
      subjectName: "Chemistry",
      code: "104",
    },
    {
      subjectName: "Biology",
      code: "105",
    },
    {
      subjectName: "Distributed Application",
      code: "106",
    },
    {
      subjectName: "Machine Learning",
      code: "107",
    },
    {
      subjectName: "Global Distributed Software Development",
      code: "108",
    },
  ];

  var dropUserTable = `DROP TABLE User`;
  con.query(dropUserTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropTutorTable = `DROP TABLE Tutor`;
  con.query(dropTutorTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropSubjectTable = `DROP TABLE Subject`;
  con.query(dropSubjectTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var sqlCreateUserTable = `CREATE TABLE User (USER_ID INT NOT NULL AUTO_INCREMENT, FIRST_NAME VARCHAR(45), LAST_NAME VARCHAR(45), MOBILE_NO BIGINT, EMAIL VARCHAR(45), PASSWORD VARCHAR(45), ROLE_ID INT, REGISTERED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP, LAST_LOGIN TIMESTAMP DEFAULT CURRENT_TIMESTAMP, HAS_PERMISSION TINYINT NOT NULL, ROLES_ROLE_ID INT, REVIEW_ID INT, IMAGE BLOB, PRIMARY KEY (USER_ID))`;
  con.query(sqlCreateUserTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var sqlCreateTutorTable = `CREATE TABLE Tutor (TUTOR_ID INT NOT NULL AUTO_INCREMENT, USER_ID INT NOT NULL, IS_ACTIVE TINYINT NOT NULL, SUBJECT_ID INT, PRICE INT, CV BLOB, PRIMARY KEY (TUTOR_ID))`;
  con.query(sqlCreateTutorTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var sqlCreateSubjectTable = `CREATE TABLE Subject (SUBJECT_ID INT NOT NULL, SUBJECT_NAME VARCHAR(45), PRIMARY KEY (SUBJECT_ID))`;
  con.query(sqlCreateSubjectTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  for (let i = 0; i < 30; i++) {
    const firstname =
      first_names[Math.round(Math.random() * (first_names.length - 1))];
    const lastname =
      last_names[Math.round(Math.random() * (last_names.length - 1))];
    const is_active = Math.round(Math.random());
    const subject = Subjects[Math.round(Math.random() * (Subjects.length - 1))];
    const price = Math.round(Math.random() * 2000);
    const phone = 123456;
    const email = "test@gmail.com";
    const password = "passowrd@123";
    const role_id = Math.round(Math.random());
    const mysqlTimestamp = new Date();

    var sqlCreateUser = `INSERT INTO User ( FIRST_NAME,LAST_NAME, MOBILE_NO, EMAIL, PASSWORD, ROLE_ID, HAS_PERMISSION,ROLES_ROLE_ID,REVIEW_ID) VALUES ("${firstname}", "${lastname}", ${phone}, "${email}", "${password}", ${role_id}, ${role_id},${role_id},${role_id})`;
    con.query(sqlCreateUser, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    var sqlCreateTutor = `INSERT INTO Tutor (USER_ID, IS_ACTIVE, SUBJECT_ID, PRICE) 
        VALUES (${i + 1}, ${is_active},${subject.code},${price})`;
    con.query(sqlCreateTutor, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  }
  for (let j = 0; j < 8; j++) {
    const subject = Subjects[j];
    var sqlCreateSubject = `INSERT INTO Subject (SUBJECT_ID, SUBJECT_NAME) 
        VALUES (${subject.code},"${subject.subjectName}")`;
    con.query(sqlCreateSubject, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

createTutors();
