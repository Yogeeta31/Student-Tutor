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
  let sql = `SELECT u.NAME,u.HAS_PERMISSION,u.IMAGE,u.EMAIL,u.MOBILE_NO,u.BIO,u.REGISTERED_AT,u.GENDER,t.*FROM TUTOR t INNER JOIN USER u ON (u.USER_ID = t.USER_ID) WHERE u.USER_ID = ${user_id}`;

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

/*
 * updateTutorDetails : Method used for to update the tutors details like password & name.
 * @member of {tutorController}
 * @param {user_id, name, email, phoneNo, gender, password} //New Password
 * @returns {} Updated details of Tutor.
 * @Author {Mohammed Afwan}
 */
module.exports.updateTutorDetails = (req, res) => {
  const { user_id, name, email, phoneNo, gender, password } = req.body;

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
          const updateTutorsPassword = `UPDATE USER
                    SET NAME = '${name}',
                    MOBILE_NO = ${phoneNo},
                    PASSWORD = '${newHashedPassword}',
                    GENDER = '${gender}'
                    WHERE (USER_ID = ${user_id} AND EMAIL ="${email}");`;
          dbConnection.query(updateTutorsPassword, async (err, result) => {
            if (err) {
              return res.status(400).json(err);
            }
            res.status(200).json({ message: "Updated Successfully" });
          });
        }
      } else {
        const updateDetails = `UPDATE USER
                SET NAME = '${name}',
                MOBILE_NO = ${phoneNo},
                GENDER = '${gender}'
                WHERE (USER_ID = ${user_id} AND EMAIL = "${email}");`;
        dbConnection.query(updateDetails, async (err, result) => {
          if (err) {
            return res.status(400).json(err);
          }
          res.status(200).json({ message: "Updated Successfully" });
        });
      }
    }
  });
};
/*
 * updateTutorSubjects : Method used for to update the existing subject of a tutor.
 * @member of {tutorController}
 * @param {user_id, subject_id, subject_name, price}
 * @returns {} Updated subjects of a tutor.
 * @Author {Mohammed Afwan}
 */
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
/*
 * addNewSubject : Method used for to add a new subject of a tutor.
 * @member of {tutorController}
 * @param { user_id, subject_name, price}
 * @returns {} Updated subjects of a tutor.
 * @Author {Mohammed Afwan}
 */
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
/*
 * deleteExistingSubject : Method used for to delete an existing subject of a tutor.
 * @member of {tutorController}
 * @param { subject_id}
 * @returns {} Updated subjects of a tutor.
 * @Author {Mohammed Afwan}
 */
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
/* ********************** End of Mohammed Afwan's Code ************************ */
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

/*
 * updateNewContent : Method used for to update the CV, Image & Bio of a tutor.
 * @member of {tutorController}
 * @param {tutorId, contentType, content} //contentType= cv,image or bio
 * @returns {} Updated content will go for the approval to tutor.
 * @Author {Mohammed Afwan}
 */
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
/* ******************************* End of Mohammed Afwan's Code ****************************************** */