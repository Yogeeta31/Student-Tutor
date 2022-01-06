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
