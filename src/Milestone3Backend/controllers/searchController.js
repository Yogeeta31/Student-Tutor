const dbConnection = require("../db");

module.exports.search_tutor_get =  (req, res) => {
    let { searchTerm, sortBy } = req.query;
    if (!searchTerm) {
        searchTerm = "";
    }
    if (Object.keys(req.query).length === 0) {
        let sql = `SELECT user.USER_ID, user.NAME, subject.SUBJECT_NAME,AVG(reviews.rating) AS AVERAGE_RATING, tutor.price FROM User INNER JOIN tutor ON (tutor.USER_ID=user.USER_ID) INNER JOIN subject ON (subject.SUBJECT_ID = tutor.SUBJECT_ID) INNER JOIN reviews ON (tutor.USER_ID=reviews.TO_USER_ID) GROUP BY tutor.USER_ID`;
        dbConnection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (sortBy === "ratings") {
        let sql = `SELECT user.USER_ID, user.NAME, subject.SUBJECT_NAME,AVG(reviews.rating) AS AVERAGE_RATING, tutor.price FROM User INNER JOIN tutor ON (tutor.USER_ID=user.USER_ID) INNER JOIN subject ON (subject.SUBJECT_ID = tutor.SUBJECT_ID) INNER JOIN reviews ON (tutor.USER_ID=reviews.TO_USER_ID) WHERE NAME LIKE "%${searchTerm}%" OR SUBJECT_NAME LIKE "%${searchTerm}%" GROUP BY tutor.USER_ID ORDER BY AVERAGE_RATING DESC;`;
        dbConnection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (sortBy === "price") {
        let sql = `SELECT user.USER_ID, user.NAME, subject.SUBJECT_NAME,AVG(reviews.rating) AS AVERAGE_RATING, tutor.price FROM User INNER JOIN tutor ON (tutor.USER_ID=user.USER_ID) INNER JOIN subject ON (subject.SUBJECT_ID = tutor.SUBJECT_ID) INNER JOIN reviews ON (tutor.USER_ID=reviews.TO_USER_ID) WHERE NAME LIKE "%${searchTerm}%" OR SUBJECT_NAME LIKE "%${searchTerm}%" GROUP BY tutor.USER_ID ORDER BY price;`;
        dbConnection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (sortBy === "ratings" && searchTerm == "") {
        let sql = `SELECT user.USER_ID, user.NAME, subject.SUBJECT_NAME,AVG(reviews.rating) AS AVERAGE_RATING, tutor.price FROM User INNER JOIN tutor ON (tutor.USER_ID=user.USER_ID) INNER JOIN subject ON (subject.SUBJECT_ID = tutor.SUBJECT_ID) INNER JOIN reviews ON (tutor.USER_ID=reviews.TO_USER_ID) GROUP BY tutor.USER_ID ORDER BY AVERAGE_RATING DESC;`;
        dbConnection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (sortBy === "price" && searchTerm == "") {
        let sql = `SELECT user.USER_ID, user.NAME, subject.SUBJECT_NAME,AVG(reviews.rating) AS AVERAGE_RATING, tutor.price FROM User INNER JOIN tutor ON (tutor.USER_ID=user.USER_ID) INNER JOIN subject ON (subject.SUBJECT_ID = tutor.SUBJECT_ID) INNER JOIN reviews ON (tutor.USER_ID=reviews.TO_USER_ID) GROUP BY tutor.USER_ID ORDER BY price;`;
        dbConnection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else {
        let sql = `SELECT user.USER_ID, user.NAME, subject.SUBJECT_NAME,AVG(reviews.rating) AS AVERAGE_RATING, tutor.price FROM User INNER JOIN tutor ON (tutor.USER_ID=user.USER_ID) INNER JOIN subject ON (subject.SUBJECT_ID = tutor.SUBJECT_ID) INNER JOIN reviews ON (tutor.USER_ID=reviews.TO_USER_ID) WHERE NAME LIKE "%${searchTerm}%" OR SUBJECT_NAME LIKE "%${searchTerm}%" GROUP BY tutor.USER_ID ;`;
        dbConnection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }
}