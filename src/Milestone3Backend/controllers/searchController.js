const { json } = require("express");
const dbConnection = require("../db");
const util = require("util");

//Code Reviewed by Bibek Gaihre
//Github username: bibekgaihre
//University email: bibek.gaihre@informatik.hs-fulda.de

//***************On the function name, You can make the function name more clearly. For eg: a Uniform approach such as using camelCase for function name.***************
//***************Add Comments on each major functionality.***************
//
module.exports.search_tutor_get = async (req, res) => {
  let { searchTerm, sortBy } = req.query;
  if (!searchTerm) {
    searchTerm = "";
  }
  //***************Separating concern of each conditions in different modules/functions.***************
  // ***************For eg: Sorting and searching concern could be decoupled into different functions, if they dont have dependencies with each other.***************

  //***************Instead of callback usage, a more readable async/await from es6 can be used. There is one library to promisify the query. for example util.promisify(dbConnection.query).bind(dbConnection);***************
  if (Object.keys(req.query).length === 0) {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE (t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1) GROUP BY s.SUBJECT_NAME,u.NAME`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } // ***************Instead of using Equality operator use of "${String}.length" can be more readable.***************
  else if (sortBy == "default" && searchTerm != "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE ((u.NAME LIKE "%${searchTerm}%" OR s.SUBJECT_NAME LIKE "%${searchTerm}%") AND t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1) GROUP BY s.SUBJECT_NAME,u.NAME`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "ratings" && searchTerm != "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE ((u.NAME LIKE "%${searchTerm}%" OR s.SUBJECT_NAME LIKE "%${searchTerm}%") AND t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1) GROUP BY s.SUBJECT_NAME,u.NAME ORDER BY AVERAGE_RATING DESC`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "price" && searchTerm != "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE ((u.NAME LIKE "%${searchTerm}%" OR s.SUBJECT_NAME LIKE "%${searchTerm}%") AND t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1) GROUP BY s.SUBJECT_NAME,u.NAME ORDER BY s.PRICE ASC`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy == "default" && searchTerm == "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE (t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1) GROUP BY s.SUBJECT_NAME,u.NAME`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "ratings" && searchTerm == "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE (t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1) GROUP BY s.SUBJECT_NAME,u.NAME ORDER BY AVERAGE_RATING DESC`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else if (sortBy === "price" && searchTerm == "") {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE (t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1) GROUP BY s.SUBJECT_NAME,u.NAME ORDER BY s.PRICE ASC;`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    let sql = `SELECT u.NAME,u.IMAGE,t.USER_ID , s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING, s.SUBJECT_ID FROM TUTOR t INNER JOIN  SUBJECT s ON (t.USER_ID = s.USER_ID) INNER JOIN USER u ON (t.USER_ID = u.USER_ID) INNER JOIN REVIEWS r ON (u.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE (u.NAME LIKE "%${searchTerm}%" OR s.SUBJECT_NAME LIKE "%${searchTerm}%" WHERE t.IS_APPROVED = 1 AND u.HAS_PERMISSION=1) GROUP BY s.SUBJECT_NAME,u.NAME`;
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  }
};
