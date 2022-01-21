const dbConnection = require("../db");
const util = require("util");
var _ = require("underscore");
module.exports.getTutorDetails = async (req, res) => {
  let { userID } = req.query;
  let sql = `SELECT u.NAME,u.IMAGE,u.EMAIL,u.MOBILE_NO,u.BIO,u.REGISTERED_AT,t.*FROM TUTOR t INNER JOIN USER u ON (u.USER_ID = t.USER_ID) WHERE u.USER_ID = ${userID}`;

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

module.exports.getReviewOptions = async (req,res) => {
  let {studentId , tutorId , subjectIds} = req.body;
  const dbPromise = util.promisify(dbConnection.query).bind(dbConnection);
  let response = []
  for (subjectId of Array.from(subjectIds))
  {
    let sqlIfReviewed = `SELECT ID FROM REVIEWS WHERE FROM_USER_ID =${studentId} AND TO_USER_ID=${tutorId} `
    let result = null;
    try {
      result = await dbPromise(sqlIfReviewed);
    } catch (err) {
      throw err;
    }
    let isReviewed = !_.isEmpty(result)

    let sqlIfContacted = `SELECT * FROM MESSAGING WHERE (SENDER_ID = ${studentId} AND RECIEVER_ID =${tutorId} ) `
    try {
      result = await dbPromise(sqlIfContacted);
    } catch (err) {
      throw err;
    }
    let isContacted = !_.isEmpty(result)
    let flag = null;
    if(!isReviewed && isContacted)
    {
      flag = 1
    }
    else
    {
      flag = 0;
    }
    response.push({SUBJECT_ID:subjectId,flag})
  }
  res.send(response)
}
