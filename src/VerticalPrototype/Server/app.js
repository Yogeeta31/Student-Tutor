const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./db");
//const db = require("./db");

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.get("/fillData", (req, res) => {

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

    var dropUserTable = `DROP TABLE IF EXISTS USER`;
    dbConnection.query(dropUserTable, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    var dropTutorTable = `DROP TABLE IF EXISTS TUTOR`;
    dbConnection.query(dropTutorTable, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    var dropSubjectTable = `DROP TABLE IF EXISTS SUBJECT`;
    dbConnection.query(dropSubjectTable, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    var dropReviewTable = `DROP TABLE IF EXISTS REVIEWS`;
    dbConnection.query(dropReviewTable, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    var sqlCreateUserTable = `CREATE TABLE USER (USER_ID INT NOT NULL AUTO_INCREMENT, NAME VARCHAR(90), MOBILE_NO BIGINT, EMAIL VARCHAR(45), PASSWORD VARCHAR(45), ROLE_ID INT, REGISTERED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP, LAST_LOGIN TIMESTAMP DEFAULT CURRENT_TIMESTAMP, HAS_PERMISSION TINYINT NOT NULL, ROLES_ROLE_ID INT, REVIEW_ID INT, IMAGE BLOB, PRIMARY KEY (USER_ID))`;
    dbConnection.query(sqlCreateUserTable, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    var sqlCreateTutorTable = `CREATE TABLE TUTOR (TUTOR_ID INT NOT NULL AUTO_INCREMENT, USER_ID INT NOT NULL, IS_ACTIVE TINYINT NOT NULL, SUBJECT_ID INT, PRICE INT, CV BLOB, PRIMARY KEY (TUTOR_ID))`;
    dbConnection.query(sqlCreateTutorTable, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    var sqlCreateSubjectTable = `CREATE TABLE SUBJECT (SUBJECT_ID INT NOT NULL, SUBJECT_NAME VARCHAR(45), PRIMARY KEY (SUBJECT_ID))`;
    dbConnection.query(sqlCreateSubjectTable, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });

    var sqlCreateReviewTable = `CREATE TABLE REVIEWS (ID INT NOT NULL AUTO_INCREMENT, REVIEW VARCHAR(400), RATING INT, FROM_USER_ID INT, TO_USER_ID INT, PRIMARY KEY (ID))`;
    dbConnection.query(sqlCreateReviewTable, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

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
      const email = "test@gmail.com";
      const password = "passowrd@123";
      const role_id = Math.round(Math.random());
      const mysqlTimestamp = new Date();

      var sqlCreateUser = `INSERT INTO USER ( NAME, MOBILE_NO, EMAIL, PASSWORD, ROLE_ID, HAS_PERMISSION,ROLES_ROLE_ID,REVIEW_ID) VALUES ("${name}", ${phone}, "${email}", "${password}", ${role_id}, ${role_id},${role_id},${role_id})`;
      dbConnection.query(sqlCreateUser, (err, result) => {
        if (err) {
          console.log(err);
        }
      });

      var sqlCreateTutor = `INSERT INTO TUTOR (USER_ID, IS_ACTIVE, SUBJECT_ID, PRICE)
          VALUES (${i + 1}, ${is_active},${subject.code},${price})`;
      dbConnection.query(sqlCreateTutor, (err, result) => {
        if (err) {
          console.log(err);
        }
      });

      var sqlCreateReview = `INSERT INTO REVIEWS (REVIEW, RATING, FROM_USER_ID, TO_USER_ID)
          VALUES ("${reviewValue}", ${rating},${30 - i},${i + 1})`;
      dbConnection.query(sqlCreateReview, (err, result) => {
        if (err) {
          console.log(err);
        }
      });

      var sqlCreateReview = `INSERT INTO REVIEWS (REVIEW, RATING, FROM_USER_ID, TO_USER_ID)
          VALUES ("${reviewValue}", ${rating},${i + 1},${30 - i})`;
      dbConnection.query(sqlCreateReview, (err, result) => {
        if (err) {
          console.log(err);
        }
      });

    }
    for (let j = 0; j < 8; j++) {
      const subject = Subjects[j];
      var sqlCreateSubject = `INSERT INTO SUBJECT (SUBJECT_ID, SUBJECT_NAME)
          VALUES (${subject.code},"${subject.subjectName}")`;
      dbConnection.query(sqlCreateSubject, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    }
  };
  createTutors();

  dbConnection.query("SELECT * FROM TUTOR", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
})

app.get("/api/tutors", (req, res) => {
  let { searchTerm, sortBy } = req.query;
  if (!searchTerm) {
    searchTerm = "";
  }
  if (Object.keys(req.query).length === 0) {
    let sql = `SELECT USER.USER_ID, USER.NAME, SUBJECT.SUBJECT_NAME,AVG(REVIEWS.RATING) AS AVERAGE_RATING, TUTOR.PRICE FROM USER INNER JOIN TUTOR ON (TUTOR.USER_ID=USER.USER_ID) INNER JOIN SUBJECT ON (SUBJECT.SUBJECT_ID = TUTOR.SUBJECT_ID) INNER JOIN REVIEWS ON (TUTOR.USER_ID=REVIEWS.TO_USER_ID) GROUP BY TUTOR.USER_ID`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "ratings") {
    let sql = `SELECT USER.USER_ID, USER.NAME, SUBJECT.SUBJECT_NAME,AVG(REVIEWS.RATING) AS AVERAGE_RATING, TUTOR.PRICE FROM USER INNER JOIN TUTOR ON (TUTOR.USER_ID=USER.USER_ID) INNER JOIN SUBJECT ON (SUBJECT.SUBJECT_ID = TUTOR.SUBJECT_ID) INNER JOIN REVIEWS ON (TUTOR.USER_ID=REVIEWS.TO_USER_ID) WHERE NAME LIKE "%${searchTerm}%" OR SUBJECT_NAME LIKE "%${searchTerm}%" GROUP BY TUTOR.USER_ID ORDER BY AVERAGE_RATING DESC;`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "price") {
    let sql = `SELECT USER.USER_ID, USER.NAME, SUBJECT.SUBJECT_NAME,AVG(REVIEWS.RATING) AS AVERAGE_RATING, TUTOR.PRICE FROM USER INNER JOIN TUTOR ON (TUTOR.USER_ID=USER.USER_ID) INNER JOIN SUBJECT ON (SUBJECT.SUBJECT_ID = TUTOR.SUBJECT_ID) INNER JOIN REVIEWS ON (TUTOR.USER_ID=REVIEWS.TO_USER_ID) WHERE NAME LIKE "%${searchTerm}%" OR SUBJECT_NAME LIKE "%${searchTerm}%" GROUP BY TUTOR.USER_ID ORDER BY PRICE;`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "ratings" && searchTerm == "") {
    let sql = `SELECT USER.USER_ID, USER.NAME, SUBJECT.SUBJECT_NAME,AVG(REVIEWS.RATING) AS AVERAGE_RATING, TUTOR.PRICE FROM USER INNER JOIN TUTOR ON (TUTOR.USER_ID=USER.USER_ID) INNER JOIN SUBJECT ON (SUBJECT.SUBJECT_ID = TUTOR.SUBJECT_ID) INNER JOIN REVIEWS ON (TUTOR.USER_ID=REVIEWS.TO_USER_ID) GROUP BY TUTOR.USER_ID ORDER BY AVERAGE_RATING DESC;`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "price" && searchTerm == "") {
    let sql = `SELECT USER.USER_ID, USER.NAME, SUBJECT.SUBJECT_NAME,AVG(REVIEWS.RATING) AS AVERAGE_RATING, TUTOR.PRICE FROM USER INNER JOIN TUTOR ON (TUTOR.USER_ID=USER.USER_ID) INNER JOIN SUBJECT ON (SUBJECT.SUBJECT_ID = TUTOR.SUBJECT_ID) INNER JOIN REVIEWS ON (TUTOR.USER_ID=REVIEWS.TO_USER_ID) GROUP BY TUTOR.USER_ID ORDER BY PRICE;`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    let sql = `SELECT USER.USER_ID, USER.NAME, SUBJECT.SUBJECT_NAME,AVG(REVIEWS.RATING) AS AVERAGE_RATING, TUTOR.PRICE FROM USER INNER JOIN TUTOR ON (TUTOR.USER_ID=USER.USER_ID) INNER JOIN SUBJECT ON (SUBJECT.SUBJECT_ID = TUTOR.SUBJECT_ID) INNER JOIN REVIEWS ON (TUTOR.USER_ID=REVIEWS.TO_USER_ID) WHERE NAME LIKE "%${searchTerm}%" OR SUBJECT_NAME LIKE "%${searchTerm}%" GROUP BY TUTOR.USER_ID ;`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  }
});



app.listen("3001", () => {
  console.log("Server started");
});
