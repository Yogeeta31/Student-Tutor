const dbConnection = require("../db");
var _ = require("underscore");
module.exports.getTutorDetails = (req, res) => {
        let { userID } = req.query;
        let sql = `SELECT * FROM USER, TUTOR WHERE USER.USER_ID = TUTOR.USER_ID AND USER.USER_ID = %${userID}%`;
        dbConnection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
};
