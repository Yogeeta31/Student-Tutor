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
  const getMessage = `SELECT * FROM MESSAGING WHERE (SENDER_ID = ${studentId} AND RECIEVER_ID = ${tutorId}) OR (SENDER_ID = ${tutorId} AND RECIEVER_ID = ${studentId}) ORDER BY SENT_AT ASC`;
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

//********Worked by Bibek */
module.exports.sendMessageSocket = (data, callback) => {
  let { receiverId, senderId, message } = data;
  let createMessage = `INSERT INTO MESSAGING (SENDER_ID,RECIEVER_ID,MESSAGE) VALUES (${senderId},${receiverId},'${message}')`;
  dbConnection.query(createMessage, (err, result) => {
    if (err) {
      console.log(err);
    }
    let fetchMessage = `SELECT MESSAGE_ID,SENT_AT, UPDATED_DATE FROM MESSAGING WHERE SENDER_ID=${senderId} AND RECIEVER_ID=${receiverId} ORDER BY SENT_AT DESC LIMIT 1`;
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
        messageId: timestamp.MESSAGE_ID,
        timestamp: {
          sentAt: timestamp.SENT_AT,
          updatedAt: timestamp.UPDATED_DATE,
        },
      });
    });
  });
};
//********------------ */

//********Worked by Bibek */
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
//********---------- */

module.exports.getMessagingList = async (req, res) => {
  let { userId, roleId } = req.query;
  const dbPromise = util.promisify(dbConnection.query).bind(dbConnection);

  let contacts = null;
  let sqlGetContacts = null;

  if (roleId == 2) {
    sqlGetContacts = `SELECT STUDENT_ID FROM CONNECTIONS WHERE TUTOR_ID = ${userId} AND REMARK = 1`;
  } else if (roleId == 3) {
    sqlGetContacts = `SELECT TUTOR_ID FROM CONNECTIONS WHERE STUDENT_ID = ${userId} AND REMARK = 1`;
  }

  try {
    contacts = await dbPromise(sqlGetContacts);
  } catch (err) {
    throw err;
  }
  let contactedIds = [];
  for (contact of contacts) {
    if (roleId == 2) {
      contactedIds.push(contact.STUDENT_ID);
    } else if (roleId == 3) {
      contactedIds.push(contact.TUTOR_ID);
    }
  }

  let response = [];
  for (contactedId of contactedIds) {
    let sqlGetContactDetails = `SELECT u.NAME,u.IMAGE FROM USER u WHERE u.USER_ID = ${contactedId} `;
    let sqlGetLastMessage = `SELECT MESSAGE,SENT_AT FROM MESSAGING WHERE (SENDER_ID = ${userId} AND RECIEVER_ID = ${contactedId}) OR (SENDER_ID = ${contactedId}  AND RECIEVER_ID = ${userId}) ORDER BY SENT_AT DESC LIMIT 1`;
    let contactDetails = null;
    let lastMessageDetails = null;
    try {
      contactDetails = await dbPromise(sqlGetContactDetails);
    } catch (err) {
      throw err;
    }

    try {
      lastMessageDetails = await dbPromise(sqlGetLastMessage);
    } catch (err) {
      throw err;
    }

    console.log(contactDetails);
    console.log(lastMessageDetails);
    let userDetail = {
      userId: contactedId,
      userName: contactDetails[0].NAME,
      profilePicture: contactDetails[0].IMAGE,
      timestamp: lastMessageDetails[0].SENT_AT,
      lastMessage: lastMessageDetails[0].MESSAGE,
    };

    response.push(userDetail);
  }

  res.json(response);
};
