const dbConnection = require("../db");
const util = require("util");
module.exports.approve_tutor_patch = (req, res) => {
  const { tutorId, isApprove } = req.body;
  const approveTutor = `UPDATE TUTOR
    SET IS_APPROVED = '${isApprove}'
    WHERE TUTOR_ID = ${tutorId};`;

  dbConnection.query(approveTutor, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json({ message: isApprove ? "Approved" : "Rejected" });
  });
};

module.exports.listOfNotVerifiedTutors = (req, res) => {
  const list = `SELECT USER.NAME, USER.IMAGE, TUTOR.IS_APPROVED, USER.USER_ID, TUTOR.UPDATED_DATE FROM TUTOR INNER JOIN USER ON (TUTOR.USER_ID=USER.USER_ID) WHERE IS_APPROVED=0`;
  dbConnection.query(list, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

module.exports.listOfApprovedTutors = (req, res) => {
  const list = `SELECT USER.NAME, USER.IMAGE, TUTOR.IS_APPROVED, USER.HAS_PERMISSION, USER.USER_ID FROM TUTOR INNER JOIN USER ON (TUTOR.USER_ID=USER.USER_ID) WHERE IS_APPROVED=1`;
  dbConnection.query(list, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

module.exports.rejectProfileWithReason = (req, res) => {
  let { reason, senderId, receiverId } = req.body;
  const postRejectMessage = `INSERT INTO REJECT_REASON ( REASON, SENDER_ID,RECEIVER_ID,TIME_SENT ) VALUES ("${reason}",${senderId},${receiverId},"${new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "")}")`;
  dbConnection.query(postRejectMessage, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

module.exports.banProfile = async (req, res) => {
  let { reason, moderatorId, userId } = req.body;
  const dbPromise = util.promisify(dbConnection.query).bind(dbConnection);
  const updateUser = `UPDATE User
                      SET HAS_PERMISSION = 0
                      WHERE USER_ID = ${userId}`;
  const postRejectMessage = `INSERT INTO 
                             BANNED_USER ( REASON, SENDER_ID,RECEIVER_ID,TIME_SENT ) 
                             VALUES ("${reason}",${moderatorId},${userId},"${new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "")}")`;
  try {
    result = await dbPromise(updateUser);
  } catch (err) {
    throw err;
  }

  try {
    result = await dbPromise(postRejectMessage);
  } catch (err) {
    throw err;
  }
  res.status(200).json(result);
};

module.exports.liftupBan = async (req, res) => {
  let { userId } = req.body;
  const dbPromise = util.promisify(dbConnection.query).bind(dbConnection);
  const updateUser = `UPDATE User
                      SET HAS_PERMISSION = 1
                      WHERE USER_ID = ${userId}`;
  try {
    result = await dbPromise(updateUser);
  } catch (err) {
    throw err;
  }
  res.status(200).json(result);
};

//list of enrolled students function
module.exports.getEnrolledStudents = (req, res) => {
  const list = `SELECT * FROM User WHERE User.ROLE_ID = 3`;
  dbConnection.query(list, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

//if approved change status to 1 on approval table and update either tutor table or user table based on content type
// isApproved=0 not approved isApproved=1 approved
module.exports.approveNewContent = (req, res) => {
  let { id , isApproved} = req.body;
  if(isApproved == 1) {
    const approve = `UPDATE APPROVAL
                      SET IS_APPROVED = 1
                      WHERE ID = ${id}`;
    dbConnection.query(approve, async (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      const list = `SELECT * FROM APPROVAL WHERE (IS_APPROVED = 1 AND ID = ${id})`;
      dbConnection.query(list, async (err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        let data = JSON.parse(JSON.stringify(result));
        console.log(data);
        let contentType = data[0].CONTENT_TYPE;
        let content = data[0].CONTENT;
        let tutorID = data[0].TUTOR_ID;
        if (contentType == 'cv') {
          const approve = `UPDATE TUTOR
                      SET CV = '${content}'
                      WHERE TUTOR_ID = ${tutorID}`;
          dbConnection.query(approve, async (err, result) => {
            if (err) {
              return res.status(400).json(err);
            }
            res.status(200).json({message: "CV Has been Approved & Updated"});
          });
        } else {
          const list = `SELECT USER_ID FROM TUTOR WHERE TUTOR_ID = ${tutorID}`;
          dbConnection.query(list, async (err, result) => {
            if (err) {
              return res.status(400).json(err);
            }
            let data = JSON.parse(JSON.stringify(result));
            let userId = data[0].USER_ID;
            if (contentType == 'image') {
              const approve = `UPDATE USER
                      SET IMAGE = '${content}'
                      WHERE USER_ID = ${userId}`;
              dbConnection.query(approve, async (err, result) => {
                if (err) {
                  return res.status(400).json(err);
                }
                res.status(200).json({message: "Image Has been Approved & Updated"});
              });
            }
            if (contentType == 'bio') {
              const approve = `UPDATE USER
                      SET BIO = '${content}'
                      WHERE USER_ID = ${userId}`;
              dbConnection.query(approve, async (err, result) => {
                if (err) {
                  return res.status(400).json(err);
                }
                res.status(200).json({message: "BIO Has been Approved & Updated"});
              });
            }
          });
        }
      });
    });
  }else {
    const approve = `UPDATE APPROVAL
                      SET IS_APPROVED = 2
                      WHERE ID = ${id}`;
    dbConnection.query(approve, async (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({message: "Content has been Rejected by the moderator"});
    });
  }
};



// Fetch all the tutors for the approval
module.exports.listOfTutorsWithNewContent = (req, res) => {
  const approve = `SELECT * FROM APPROVAL WHERE IS_APPROVED = 0`;
  dbConnection.query(approve, (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};
