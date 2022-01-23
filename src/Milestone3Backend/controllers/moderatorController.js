const dbConnection = require("../db");
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
  const list = `SELECT USER.NAME, USER.IMAGE, TUTOR.IS_APPROVED, USER.USER_ID FROM TUTOR INNER JOIN USER ON (TUTOR.USER_ID=USER.USER_ID) WHERE IS_APPROVED=1`;
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
