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
  const list = `SELECT USER.NAME, USER.IMAGE, TUTOR.IS_APPROVED, USER.USER_ID FROM TUTOR, USER WHERE IS_APPROVED=0`;
  dbConnection.query(list, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

module.exports.listOfApprovedTutors = (req, res) => {
  const list = `SELECT USER.NAME, USER.IMAGE, TUTOR.IS_APPROVED, USER.USER_ID FROM TUTOR, USER WHERE IS_APPROVED=1`;
  dbConnection.query(list, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};
