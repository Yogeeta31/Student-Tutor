const dbConnection = require("../db");
var _ = require("underscore");
module.exports.getTutorDetails = (req, res) => {
        let { userID } = req.query;
        let sql = `SELECT USER.NAME, USER.MOBILE_NO, USER.EMAIL, USER.IMAGE, USER.LAST_LOGIN, TUTOR.SUBJECT_ID, TUTOR.PRICE, TUTOR.IS_APPROVED, TUTOR.CV FROM USER INNER JOIN TUTOR ON (TUTOR.USER_ID=USER.USER_ID) WHERE USER.USER_ID = "${userID}"`;

        dbConnection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
};
