const dbConnection = require("../db");
const util = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var _ = require("underscore");
// controller actions

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};


module.exports.getStudentDetails = async (req, res) => {
    let {user_id} = req.query;
    let sql = `SELECT u.NAME,u.IMAGE,u.EMAIL,u.MOBILE_NO,u.REGISTERED_AT, u.PASSWORD FROM USER u WHERE u.USER_ID = ${user_id}`;

    const dbPromise = util.promisify(dbConnection.query).bind(dbConnection);
    let result = null;
    try {
        result = await dbPromise(sql);
    } catch (err) {
        throw err;
    }

    if (_.isEmpty(result)) {
        res.status(400).json({message: "Student Not Found"});
        return;
    }

    var student = JSON.parse(JSON.stringify(result[0]));
    res.json(student);
};

module.exports.updateStudentDetails = (req, res) => {
    const {user_id, name, email, phoneNo, gender, password} = req.body;

    const loginUser = `SELECT u.PASSWORD, u.USER_ID, u.ROLE_ID
        FROM USER u
        WHERE u.EMAIL = "${email}"`;
        dbConnection.query(loginUser, async (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            const data = JSON.parse(JSON.stringify(result));
            if (_.isEmpty(data)) {
                res.status(200).json({errors: {email: "Email Does not exist"}});
            } else {
                const hashedPassword = data[0].PASSWORD;

                if ((password !== "" && password !== null)) {
                    const isSame = await bcrypt.compare(password, hashedPassword);
                    if (isSame) {
                        res.status(200).json({errors: {password: "New Password can't be same as Old Password"}});
                    } else{
                        let newHashedPassword = await hashPassword(password);
                        const updateStudent = `UPDATE USER
                    SET NAME = '${name}',
                    MOBILE_NO = ${phoneNo},
                    PASSWORD = '${newHashedPassword}',
                    GENDER = '${gender}'
                    WHERE (USER_ID = ${user_id} AND EMAIL ="${email}");`;
                        dbConnection.query(updateStudent, async (err, result) => {
                            if (err) {
                                return res.status(400).json(err);
                            }
                            res.status(200).json({message: "Updated Successfully"});
                        });
                }
                }else {
                    const updateStudent = `UPDATE USER
                SET NAME = '${name}',
                MOBILE_NO = ${phoneNo},
                GENDER = '${gender}'
                WHERE (USER_ID = ${userID} AND EMAIL = "${email}");`;
                    dbConnection.query(updateStudent, async (err, result) => {
                        if (err) {
                            return res.status(400).json(err);
                        }
                        res.status(200).json({message: "Updated Successfully"});
                    });
                }
            }
        });
};
