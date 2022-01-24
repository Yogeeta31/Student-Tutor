const { json } = require("express");
const dbConnection = require("../db");
const util = require("util");

module.exports.search_tutor_get = async (req, res) => {
  let { searchTerm, sortBy } = req.query;
  if (!searchTerm) {
    searchTerm = "";
  }
  if (Object.keys(req.query).length === 0) {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE (t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1) GROUP BY s.SUBJECT_NAME,u.NAME`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy == "default" && searchTerm != "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE (u.NAME LIKE "%${searchTerm}%" OR s.SUBJECT_NAME LIKE "%${searchTerm}%" AND t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1) GROUP BY s.SUBJECT_NAME,u.NAME`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "ratings" && searchTerm != "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE u.NAME LIKE "%${searchTerm}%" OR s.SUBJECT_NAME LIKE "%${searchTerm}%" AND t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1 GROUP BY s.SUBJECT_NAME,u.NAME ORDER BY AVERAGE_RATING DESC`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "price" && searchTerm != "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE u.NAME LIKE "%${searchTerm}%" OR s.SUBJECT_NAME LIKE "%${searchTerm}%" AND t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1 GROUP BY s.SUBJECT_NAME,u.NAME ORDER BY s.PRICE ASC`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy == "default" && searchTerm == "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1 GROUP BY s.SUBJECT_NAME,u.NAME`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "ratings" && searchTerm == "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1 GROUP BY s.SUBJECT_NAME,u.NAME ORDER BY AVERAGE_RATING DESC`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "price" && searchTerm == "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1 GROUP BY s.SUBJECT_NAME,u.NAME ORDER BY s.PRICE ASC;`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE u.NAME LIKE "%${searchTerm}%" OR s.SUBJECT_NAME LIKE "%${searchTerm}%" WHERE t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1 GROUP BY s.SUBJECT_NAME,u.NAME`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  }
};
