const dbConnection = require("../db");
var _ = require("underscore");
module.exports.sendMessageRequest = async (req, res) => {
  let { studentId, tutorId, message } = req.body;

  const addConnection = `INSERT INTO CONNECTIONS (STUDENT_ID,TUTOR_ID,REMARK,MESSAGE) VALUES (${studentId},${tutorId},0,'${message}')`;

  dbConnection.query(addConnection, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json({ message: "request sent" });
  });
};

//pending= 0, accept=1, reject=2
module.exports.changeMessageRequestStatus = async (req, res) => {
  let { status, studentId, tutorId } = req.query;

  const changeStatus = `UPDATE CONNECTIONS SET REMARK=${status} WHERE STUDENT_ID=${studentId} AND TUTOR_ID=${tutorId}`;
  dbConnection.query(changeStatus, async (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ message: "Remark Changed" });
  });
};

module.exports.getAllMessages = async (req, res) => {
  let { studentId, tutorId } = req.query;
  const getMessage = `SELECT MESSAGE FROM MESSAGING WHERE (SENDER_ID = ${studentId} AND RECIEVER_ID = ${tutorId}) OR (SENDER_ID = ${tutorId} AND RECIEVER_ID = ${studentId}) ORDER BY SENT_AT ASC`;
  dbConnection.query(getMessage, async (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ result });
  });
};

module.exports.getAllConnections = async (req, res) => {};

module.exports.checkConnections = async (req, res) => {
  let { studentId, tutorId } = req.body;

  const chkConnection = `SELECT * FROM CONNECTIONS c WHERE c.STUDENT_ID = ${studentId} AND c.TUTOR_ID = ${tutorId}`;

  dbConnection.query(chkConnection, async (err, result) => {
    if (err) {
      return res.status(200).json(err);
    }
    const data = JSON.parse(JSON.stringify(result));
    if (_.isEmpty(data)) {
      res.status(404).json({ message: "Connection not made yet." });
    } else {
      res.status(200).json({ remark: data[0].REMARK });
    }
  });
};
