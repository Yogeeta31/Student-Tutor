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
  let sql = `SELECT u.NAME,u.HAS_PERMISSION,u.IMAGE,u.EMAIL,u.MOBILE_NO,u.BIO,u.REGISTERED_AT,t.*FROM TUTOR t INNER JOIN USER u ON (u.USER_ID = t.USER_ID) WHERE u.USER_ID = ${user_id}`;

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
  let sqlSubectQuery = `SELECT s.SUBJECT_ID,s.SUBJECT_NAME, s.PRICE , AVG(r.RATING) AS AVERAGE_RATING FROM TUTOR t  INNER JOIN SUBJECT s  ON (t.USER_ID = s.USER_ID) INNER JOIN REVIEWS r ON (t.USER_ID = r.TO_USER_ID AND r.SUBJECT_ID = s.SUBJECT_ID) WHERE t.USER_ID = ${user_id} GROUP BY s.SUBJECT_NAME`;
  let subjects = null;
  try {
    subjects = await dbPromise(sqlSubectQuery);
  } catch (err) {
    throw err;
  }
  tutor["subjects"] = JSON.parse(JSON.stringify(subjects));

  tutor["reviews"] = [];
  let sqlReviewQuery = `SELECT r.REVIEW, r.RATING FROM TUTOR t  INNER JOIN REVIEWS r  ON (t.USER_ID = r.TO_USER_ID) WHERE t.USER_ID = ${user_id} ORDER BY r.RATING DESC`;
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

module.exports.updateTutorDetails = (req, res) => {
  const { user_id, name, email, phoneNo, gender, password, bio } = req.body;

  const loginUser = `SELECT u.PASSWORD, u.USER_ID, u.ROLE_ID
        FROM USER u
        WHERE u.EMAIL = "${email}"`;
  dbConnection.query(loginUser, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    const data = JSON.parse(JSON.stringify(result));
    if (_.isEmpty(data)) {
      res.status(200).json({ errors: { email: "Email Does not exist" } });
    } else {
      const hashedPassword = data[0].PASSWORD;
      if (password !== "" && password !== null) {
        const isSame = await bcrypt.compare(password, hashedPassword);
        if (isSame) {
          res.status(200).json({
            errors: {
              password: "New Password can't be same as Old Password",
            },
          });
        } else {
          let newHashedPassword = await hashPassword(password);
          const updateStudent = `UPDATE USER
                    SET NAME = '${name}',
                    MOBILE_NO = ${phoneNo},
                    BIO = '${bio}',
                    PASSWORD = '${newHashedPassword}',
                    GENDER = '${gender}'
                    WHERE (USER_ID = ${user_id} AND EMAIL ="${email}");`;
          dbConnection.query(updateStudent, async (err, result) => {
            if (err) {
              return res.status(400).json(err);
            }
            res.status(200).json({ message: "Updated Successfully" });
          });
        }
      } else {
        const updateStudent = `UPDATE USER
                SET NAME = '${name}',
                BIO = '${bio}',
                MOBILE_NO = ${phoneNo},
                GENDER = '${gender}'
                WHERE (USER_ID = ${user_id} AND EMAIL = "${email}");`;
        dbConnection.query(updateStudent, async (err, result) => {
          if (err) {
            return res.status(400).json(err);
          }
          res.status(200).json({ message: "Updated Successfully" });
        });
      }
    }
  });
};

module.exports.updateTutorSubjects = (req, res) => {
  const { user_id, subject_id, subject_name, price } = req.body;

  const loginUser = `SELECT SUBJECT_NAME, PRICE
        FROM SUBJECT 
        WHERE (SUBJECT_ID = "${subject_id}" AND USER_ID = ${user_id})`;
  dbConnection.query(loginUser, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    const data = JSON.parse(JSON.stringify(result));
    if (_.isEmpty(data)) {
      res.status(200).json({ errors: { email: "Subject Does not exist" } });
    } else {
      const updateSubject = `UPDATE SUBJECT
                SET SUBJECT_NAME = '${subject_name}',
                PRICE = ${price}
                WHERE (SUBJECT_ID = "${subject_id}" AND USER_ID = ${user_id});`;
      dbConnection.query(updateSubject, async (err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.status(200).json({ message: "Subject Updated Successfully" });
      });
    }
  });
};

module.exports.addNewSubject = (req, res) => {
  const { user_id, subject_name, price } = req.body;

  var sqlCreateSubject = `INSERT INTO SUBJECT (SUBJECT_NAME, USER_ID, PRICE) VALUES ("${subject_name}",${user_id},${price})`;
  dbConnection.query(sqlCreateSubject, (err, result) => {
    if (err) {
      console.log(err);
    }
    subject_id = result.insertId;

    var sqlCreateReview = `INSERT INTO REVIEWS (TO_USER_ID, SUBJECT_ID, RATING) VALUES (${user_id},${subject_id},0)`;
    dbConnection.query(sqlCreateReview, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ message: "Subject Added Successfully" });
    });
  });
};

module.exports.deleteExistingSubject = (req, res) => {
  const { subject_id } = req.body;
  var sqlDeleteSubject = `DELETE FROM SUBJECT WHERE SUBJECT_ID = ${subject_id}`;
  dbConnection.query(sqlDeleteSubject, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ message: "Subject Deleted Successfully" });
  });
};

module.exports.updateTutorCV = (req, res) => {
  const { user_id, CV } = req.body;

  const updateCV = `UPDATE TUTOR
                SET CV = '${CV}',
                IS_APPROVED = 0
                WHERE USER_ID = ${user_id};`;
  dbConnection.query(updateCV, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json({ message: "CV Updated Successfully" });
  });
};

module.exports.updateTutorImage = (req, res) => {
  const { user_id, image } = req.body;

  const updateImage = `UPDATE USER
                SET IMAGE = '${image}'
                WHERE USER_ID = ${user_id};`;
  dbConnection.query(updateImage, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    var updateApprovalStatus = `UPDATE TUTOR SET IS_APPROVED = 0
                WHERE USER_ID = ${user_id};`;
    dbConnection.query(updateApprovalStatus, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ message: "Image Updated Successfully" });
    });
  });
};
module.exports.getReviewOptions = async (req, res) => {
  let { studentId, tutorId } = req.body;
  const dbPromise = util.promisify(dbConnection.query).bind(dbConnection);

  let sqlIfReviewed = `SELECT ID FROM REVIEWS WHERE FROM_USER_ID =${studentId} AND TO_USER_ID=${tutorId} `;
  let result = null;
  try {
    result = await dbPromise(sqlIfReviewed);
  } catch (err) {
    throw err;
  }
  let isReviewed = !_.isEmpty(result);

  let sqlIfContacted = `SELECT * FROM CONNECTIONS WHERE STUDENT_ID = ${studentId} AND TUTOR_ID =${tutorId} AND REMARK = 1 `;
  try {
    result = await dbPromise(sqlIfContacted);
  } catch (err) {
    throw err;
  }
  let isContacted = !_.isEmpty(result);
  let flag = null;
  if (!isReviewed && isContacted) {
    flag = 1;
  } else {
    flag = 0;
  }
  res.send({ flag });
};

module.exports.reviewTutor = (req, res) => {
  let { studentId, tutorId, subjectId, review, rating } = req.body;
  let sqlAddReview = `INSERT INTO REVIEWS (RATING,REVIEW,FROM_USER_ID,TO_USER_ID,SUBJECT_ID) VALUES (${rating},\"${review}\",${studentId},${tutorId},${subjectId})`;

  dbConnection.query(sqlAddReview, (err, result) => {
    if (err) {
      return res.status(400).send({ message: "Review Failed" });
    }
    res.status(200).send({ message: "Review Successful" });
  });
};

//contentType= cv,image or bio
module.exports.updateNewContent = (req, res) => {
  let { tutorId, contentType, content } = req.body;
  let update = `INSERT INTO APPROVAL (TUTOR_ID,IS_APPROVED,CONTENT_TYPE,CONTENT) VALUES (${tutorId},0,'${contentType}','${content}')`;
  dbConnection.query(update, (err, result) => {
    if (err) {
      console.log(err);
    }
    res
      .status(200)
      .send({ message: "Your Data is updated. Sent for approval" });
  });
};
