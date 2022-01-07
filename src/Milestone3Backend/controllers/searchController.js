const dbConnection = require("../db");

module.exports.search_tutor_get = (req, res) => {
  let { searchTerm, sortBy } = req.query;
  if (!searchTerm) {
    searchTerm = "";
  }
  if (Object.keys(req.query).length === 0) {
    let sql = `SELECT u.NAME,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING , s.PRICE , s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) GROUP BY s.SUBJECT_NAME`;
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
};