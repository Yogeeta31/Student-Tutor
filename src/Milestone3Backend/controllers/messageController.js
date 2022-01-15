const dbConnection = require("../db");
const util = require("util");
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
  let { status, studentId, tutorId } = req.body;
  const dbPromise = util.promisify(dbConnection.query).bind(dbConnection);

  let sqlGetCurrentStatus = `SELECT c.REMARK FROM CONNECTIONS c WHERE c.STUDENT_ID = ${studentId} AND c.TUTOR_ID = ${tutorId}`;
  let currentStatus = null;
  try {
    currentStatus = await dbPromise(sqlGetCurrentStatus);
  } catch (err) {
    throw err;
  }
  if (_.isEmpty(currentStatus)) {
    res.status(400).json({ message: "Connection not found" });
    return;
  } else {
    if (currentStatus[0].REMARK === 1) {
      res.status(400).json({ message: "Connection Already Accepted" });
      return;
    }
  }

  const changeStatus = `UPDATE CONNECTIONS SET REMARK=${status} WHERE STUDENT_ID=${studentId} AND TUTOR_ID=${tutorId}`;
  try {
    await dbPromise(changeStatus);
  } catch (err) {
    throw err;
  }

  if (status == 1) {
    const getMessageFromConn = `Select * FROM CONNECTIONS  WHERE STUDENT_ID=${studentId} AND TUTOR_ID=${tutorId}`;
    let result = null;
    try {
      result = await dbPromise(getMessageFromConn);
    } catch (err) {
      throw err;
    }
    if (_.isEmpty(result)) {
      res.status(400).json({ message: "Connection not found" });
      return;
    }
    var connection = JSON.parse(JSON.stringify(result[0]));
    console.log("Connection receieved", connection);
    const pushInMessageTable = `INSERT INTO MESSAGING (SENDER_ID,RECIEVER_ID,MESSAGE) VALUES (${studentId},${tutorId},'${connection.MESSAGE}')`;
    try {
      await dbPromise(pushInMessageTable);
    } catch (err) {
      throw err;
    }
    res.status(201).json({ message: "Connection Established" });
  } else {
    res.status(200).json({ message: "Connection Not Established" });
  }
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

module.exports.sendMessageSocket = (data, callback) => {
  let { receiverId, senderId, message } = data;
  let createMessage = `INSERT INTO MESSAGING (SENDER_ID,RECIEVER_ID,MESSAGE) VALUES (${senderId},${receiverId},'${message}')`;
  dbConnection.query(createMessage, (err, result) => {
    if (err) {
      console.log(err);
    }
    let fetchMessage = `SELECT SENT_AT, UPDATED_DATE FROM MESSAGING WHERE SENDER_ID=${senderId} AND RECIEVER_ID=${receiverId} ORDER BY SENT_AT DESC LIMIT 1`;
    dbConnection.query(fetchMessage, (err, result) => {
      if (err) {
        console.log(err);
      }
      let timestamp = JSON.parse(JSON.stringify(result));
      timestamp = timestamp[0];
      callback({
        receiverId,
        senderId,
        message,
        timestamp,
      });
      return;
    });

    // return cb(result);
  });
};

module.exports.getMessageScoket = (data, callback) => {
  let { receiverId, senderId } = data;
  let fetchMessage = `SELECT * FROM MESSAGING WHERE (RECIEVER_ID = ${receiverId} AND SENDER_ID=${senderId}) OR (RECIEVER_ID=${senderId} AND SENDER_ID=${receiverId}) ORDER BY SENT_AT LIMIT 100`;
  dbConnection.query(fetchMessage, (err, result) => {
    if (err) {
      console.log(err);
    }
    let message = JSON.parse(JSON.stringify(result));
    callback(message);
    return;
  });
};
