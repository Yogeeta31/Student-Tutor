const dbConnection = require("../db");
const util = require("util");
var _ = require("underscore");
module.exports.getTutorDetails = async (req, res) => {
  let { userID } = req.query;
  let sql = `SELECT u.NAME,u.IMAGE,u.BIO,u.REGISTERED_AT,t.*FROM TUTOR t INNER JOIN USER u ON (u.USER_ID = t.USER_ID) WHERE u.USER_ID = ${userID}`;

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
  let sqlSubectQuery = `SELECT s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING FROM TUTOR t  INNER JOIN SUBJECT s  ON (t.USER_ID = s.USER_ID) INNER JOIN REVIEWS r ON (t.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE t.USER_ID = ${userID} GROUP BY s.SUBJECT_NAME`;
  let subjects = null;
  try {
    subjects = await dbPromise(sqlSubectQuery);
  } catch (err) {
    throw err;
  }
  tutor["subjects"] = JSON.parse(JSON.stringify(subjects));

  tutor["reviews"] = [];
  let sqlReviewQuery = `SELECT r.REVIEW, r.RATING FROM TUTOR t  INNER JOIN REVIEWS r  ON (t.USER_ID = r.TO_USER_ID) WHERE t.USER_ID = ${userID} ORDER BY r.RATING DESC LIMIT 3`;
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
  tutor["reviews"] = JSON.parse(JSON.stringify(reviews));

  res.json(tutor);
};
