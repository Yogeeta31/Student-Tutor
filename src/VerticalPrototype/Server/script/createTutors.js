const mysql = require("mysql");
const dotenv = require("dotenv").config({path : `${__dirname}/../.env`});
const moment = require("moment");
const bcrypt = require('bcrypt');


var con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

con.connect(async (err) => {
  if (err) {
    console.log(err);
    console.log("Error in Connection");
  } else {
    console.log("Successful Connection");
    await createTutors()
    con.end(() => {
      if (err) {
        console.log("error:" + err.message);
      } else {
        console.log("DB RESET");
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
  "Ankit",
  "Yogeeta",
  "James",
  "Omar",
  "Bibek",
  "Donald",
];
const last_names = [
  "Kakadiya",
  "Dalal",
  "Anand",
  "Sharma",
  "Statiya",
  "Gaihre",
  "Nurmagomedov",
  "Chimaev",
  "Mcregor",
];

const randomReviews = [
  "Average",
  "Brilliant",
  "Good",
  "Not Helpful",
];

const createTutors = async () => {
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

  let emailDomains = ["gmail","outlook","hotmail","yahoo"]
  let emailEndings = [".com",".de",".edu",".gov"]

  var dropUserTable = `DROP TABLE IF EXISTS User`;
  con.query(dropUserTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropTutorSubjectTable = 'DROP TABLE IF EXISTS Tutor_has_Subject';
  con.query(dropTutorSubjectTable, (err, result) => {
    if (err) {
      console.log(err);
    }
    
  });

  var dropTutorTable = `DROP TABLE IF EXISTS Tutor`;
  con.query(dropTutorTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropSubjectTable = `DROP TABLE IF EXISTS Subject`;
  con.query(dropSubjectTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropReviewTable = `DROP TABLE IF EXISTS Reviews`;
  con.query(dropReviewTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

 

  var sqlCreateUserTable = `CREATE TABLE User (USER_ID INT NOT NULL AUTO_INCREMENT, NAME VARCHAR(90), MOBILE_NO BIGINT, EMAIL VARCHAR(45), PASSWORD VARCHAR(100), ROLE_ID INT, REGISTERED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP, LAST_LOGIN TIMESTAMP DEFAULT CURRENT_TIMESTAMP, HAS_PERMISSION TINYINT NOT NULL, ROLES_ROLE_ID INT, REVIEW_ID INT, IMAGE BLOB, PRIMARY KEY (USER_ID), UNIQUE(EMAIL))`;
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

  var sqlCreateReviewTable = `CREATE TABLE Reviews (ID INT NOT NULL AUTO_INCREMENT, REVIEW VARCHAR(400), RATING INT, FROM_USER_ID INT, TO_USER_ID INT, PRIMARY KEY (ID))`;
  con.query(sqlCreateReviewTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

 var sqlCreateTutorSubjectTable = 'CREATE TABLE Tutor_has_Subject ( TUTOR_ID INT NOT NULL , SUBJECT_ID INT NOT NULL,FOREIGN KEY (TUTOR_ID) REFERENCES Tutor(TUTOR_ID),FOREIGN KEY (SUBJECT_ID) REFERENCES Subject(SUBJECT_ID), PRIMARY KEY(TUTOR_ID,SUBJECT_ID) );'
 con.query(sqlCreateTutorSubjectTable, (err, result) => {
  if (err) {
    console.log(err);
  }
});

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

  for (let i = 0; i < 30; i++) {
    const firstname =
      first_names[Math.round(Math.random() * (first_names.length - 1))];
    const lastname =
      last_names[Math.round(Math.random() * (last_names.length - 1))];
    const reviewValue =
      randomReviews[Math.round(Math.random() * (randomReviews.length - 1))];
    const name = firstname + " " + lastname
    const rating = Math.floor(Math.random() * 5 + 1);
    const is_active = Math.round(Math.random());
    const subject = Subjects[Math.round(Math.random() * (Subjects.length - 1))];
    const price = Math.round(Math.random() * 2000);
    const phone = 123456;
    const email = firstname+lastname+"@"+emailDomains[Math.round(Math.random() * (emailDomains.length - 1))]+emailEndings[Math.round(Math.random() * (emailEndings.length - 1))]
    const salt = await bcrypt.genSalt();
    let password = "passowrd@123";
    password = await bcrypt.hash(password,salt);
    const role_id = Math.round(Math.random());
    const mysqlTimestamp = new Date();


    var sqlCreateUser = `INSERT INTO User ( NAME, MOBILE_NO, EMAIL, PASSWORD, ROLE_ID, HAS_PERMISSION,ROLES_ROLE_ID,REVIEW_ID) VALUES ("${name}", ${phone}, "${email}", "${password}", ${role_id}, ${role_id},${role_id},${role_id})`;
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

    var sqlAddSubjectToTutor = `INSERT INTO Tutor_has_Subject (TUTOR_ID, SUBJECT_ID) 
    VALUES (${i + 1}, ${subject.code})`;
    con.query(sqlAddSubjectToTutor, (err, result) => {
      if (err) {
        console.log(err);
      }
    });



    var sqlCreateReview = `INSERT INTO Reviews (REVIEW, RATING, FROM_USER_ID, TO_USER_ID)
        VALUES ("${reviewValue}", ${rating},${30 - i},${i + 1})`;
    con.query(sqlCreateReview, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    var sqlCreateReview = `INSERT INTO Reviews (REVIEW, RATING, FROM_USER_ID, TO_USER_ID)
        VALUES ("${reviewValue}", ${rating},${i + 1},${30 - i})`;
    con.query(sqlCreateReview, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

  }

};


