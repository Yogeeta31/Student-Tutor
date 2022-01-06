const mysql = require("mysql");
const dotenv = require("dotenv").config({ path: `${__dirname}/../.env` });

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
    await createTutors();
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

const createTutors = async () => {
  var dropUserTable = `DROP TABLE IF EXISTS USER`;
  con.query(dropUserTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropTutorSubjectTable = "DROP TABLE IF EXISTS TUTOR_HAS_SUBJECT";
  con.query(dropTutorSubjectTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropTutorTable = `DROP TABLE IF EXISTS TUTOR`;
  con.query(dropTutorTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropSubjectTable = `DROP TABLE IF EXISTS SUBJECT`;
  con.query(dropSubjectTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropReviewTable = `DROP TABLE IF EXISTS REVIEWS`;
  con.query(dropReviewTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropMessagingTable = `DROP TABLE IF EXISTS MESSAGING`;
  con.query(dropMessagingTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var dropConnectionsTable = `DROP TABLE IF EXISTS CONNECTIONS`
  con.query(dropConnectionsTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var sqlCreateUserTable = `CREATE TABLE USER (USER_ID INT NOT NULL AUTO_INCREMENT, NAME VARCHAR(90), MOBILE_NO BIGINT, EMAIL VARCHAR(45), PASSWORD VARCHAR(100), ROLE_ID INT, REGISTERED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP, LAST_LOGIN TIMESTAMP DEFAULT CURRENT_TIMESTAMP, HAS_PERMISSION TINYINT NOT NULL, ROLES_ROLE_ID INT, REVIEW_ID INT, IMAGE BLOB, PRIMARY KEY (USER_ID), UNIQUE(EMAIL))`;
  con.query(sqlCreateUserTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var sqlCreateTutorTable = `CREATE TABLE TUTOR (TUTOR_ID INT NOT NULL AUTO_INCREMENT, USER_ID INT NOT NULL, IS_ACTIVE TINYINT NOT NULL, SUBJECT_ID INT, PRICE INT, IS_APPROVED TINYINT ,CV BLOB, PRIMARY KEY (TUTOR_ID))`;
  con.query(sqlCreateTutorTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var sqlCreateSubjectTable = `CREATE TABLE SUBJECT (SUBJECT_ID INT NOT NULL, SUBJECT_NAME VARCHAR(45), PRIMARY KEY (SUBJECT_ID))`;
  con.query(sqlCreateSubjectTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var sqlCreateReviewTable = `CREATE TABLE REVIEWS (ID INT NOT NULL AUTO_INCREMENT, REVIEW VARCHAR(400), RATING INT, FROM_USER_ID INT, TO_USER_ID INT, PRIMARY KEY (ID))`;
  con.query(sqlCreateReviewTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var sqlCreateTutorSubjectTable =
    "CREATE TABLE TUTOR_HAS_SUBJECT ( TUTOR_ID INT NOT NULL , SUBJECT_ID INT NOT NULL,FOREIGN KEY (TUTOR_ID) REFERENCES TUTOR(TUTOR_ID),FOREIGN KEY (SUBJECT_ID) REFERENCES SUBJECT(SUBJECT_ID), PRIMARY KEY(TUTOR_ID,SUBJECT_ID) );";
  con.query(sqlCreateTutorSubjectTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var sqlCreateMessagingTable = `CREATE TABLE MESSAGING ( SENDER_ID INT NOT NULL ,RECIEVER_ID INT NOT NULL ,MESSAGE VARCHAR(255) ,SENT_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
  con.query(sqlCreateMessagingTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  var sqlCreateConnectionsTable = `CREATE TABLE CONNECTIONS(STUDENT_ID INT,TUTOR_ID INT,REMARK TINYINT,MESSAGE VARCHAR(255), PRIMARY KEY(STUDENT_ID,TUTOR_ID))`;
  con.query(sqlCreateConnectionsTable, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

};
