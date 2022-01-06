const dbConnection = require("../db");

module.exports.search_tutor_get =  (req, res) => {
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
    } else if (sortBy === "PRICE") {
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
    } else if (sortBy === "PRICE" && searchTerm == "") {
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
}