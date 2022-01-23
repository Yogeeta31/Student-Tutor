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
module.exports.getTutorDetails = async (req, res) => {
  let { user_id } = req.query;
  let sql = `SELECT u.NAME,u.IMAGE,u.EMAIL,u.MOBILE_NO,u.BIO,u.REGISTERED_AT,t.*FROM TUTOR t INNER JOIN USER u ON (u.USER_ID = t.USER_ID) WHERE u.USER_ID = ${user_id}`;

  const dbPromise = util.promisify(dbConnection.query).bind(dbConnection);

  let result = null;
  try {
    result = await dbPromise(sql);
  } catch (err) {
    throw err;
  }

  if (_.isEmpty(result)) {
    res.status(400).json({ message: "Tutor Not Found" });
    return;
  }

  var tutor = JSON.parse(JSON.stringify(result[0]));

  tutor["subjects"] = [];
  let sqlSubectQuery = `SELECT s.SUBJECT_ID,s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING FROM TUTOR t  INNER JOIN SUBJECT s  ON (t.USER_ID = s.USER_ID) INNER JOIN REVIEWS r ON (t.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE t.USER_ID = ${userID} GROUP BY s.SUBJECT_NAME`;
  let subjects = null;
  try {
    subjects = await dbPromise(sqlSubectQuery);
  } catch (err) {
    throw err;
  }
  tutor["subjects"] = JSON.parse(JSON.stringify(subjects));

  for (subject of tutor["subjects"]) {
    subject["reviews"] = [];
    let sqlReviewQuery = `SELECT r.REVIEW, r.RATING FROM TUTOR t  INNER JOIN REVIEWS r  ON (t.USER_ID = r.TO_USER_ID) WHERE t.USER_ID = ${userID} AND r.SUBJECT_ID = ${subject.SUBJECT_ID} ORDER BY r.RATING DESC`;
    let reviews = null;
    try {
      reviews = await dbPromise(sqlReviewQuery);
    } catch (err) {
      throw err;
    }

    for (review of reviews) {
      if (review.REVIEW == null) {
        review.REVIEW = "";
      }
    }
    subject["reviews"] = JSON.parse(JSON.stringify(reviews));
  }

  res.json(tutor);
};

module.exports.getTutorReviews = (req, res) => {};

module.exports.getRejectionReason = (req, res) => {
  let { tutorId } = req.body;
  const reasonMessage = `SELECT * FROM REJECT_REASON WHERE RECEIVER_ID = ${tutorId}`;
  dbConnection.query(reasonMessage, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

module.exports.getMessageFromConn = (req, res) => {
  let { tutorId } = req.body;
  const reasonMessage = `SELECT c.STUDENT_ID, c.TUTOR_ID, c.REMARK , c.MESSAGE , c.UPDATED_DATE , u.NAME, u.IMAGE
  FROM CONNECTIONS c
  INNER JOIN User u ON c.STUDENT_ID=u.USER_ID WHERE  TUTOR_ID=${tutorId}`;
  dbConnection.query(reasonMessage, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};
