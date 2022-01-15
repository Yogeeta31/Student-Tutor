const dbConnection = require("../db");
const util = require('util');
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
    try
    {
        currentStatus = await dbPromise(sqlGetCurrentStatus);
    }
    catch(err)
    {
        throw err;
    }
    if(_.isEmpty(currentStatus))
    {
        res.status(400).json({message : "Connection not found"});
        return;
    }
    else
    {
      if(currentStatus[0].REMARK===1)
      {
        res.status(400).json({message : "Connection Already Accepted"});
        return;
      } 
    }


  const changeStatus = `UPDATE CONNECTIONS SET REMARK=${status} WHERE STUDENT_ID=${studentId} AND TUTOR_ID=${tutorId}`;
  try
  {
      await dbPromise(changeStatus);
  }
  catch(err)
  {
      throw err;
  }

  if(status == 1){
    const getMessageFromConn = `Select * FROM CONNECTIONS  WHERE STUDENT_ID=${studentId} AND TUTOR_ID=${tutorId}`;
    let result = null;
    try
    {
        result = await dbPromise(getMessageFromConn);
    }
    catch(err)
    {
        throw err;
    }
    if(_.isEmpty(result))
    {
        res.status(400).json({message : "Connection not found"});
        return;
    }
    var connection = JSON.parse(JSON.stringify(result[0]));
    console.log("Connection receieved", connection);
    const pushInMessageTable = `INSERT INTO MESSAGING (SENDER_ID,RECIEVER_ID,MESSAGE) VALUES (${studentId},${tutorId},'${connection.MESSAGE}')`;
    try
    {
       await dbPromise(pushInMessageTable);
    }
    catch(err)
    {
        throw err;
    }
    res.status(201).json({message : "Connection Established"})
  }
  else
  {
    res.status(200).json({message : "Connection Not Established"})
  }
};

module.exports.getAllMessages = (req, res) => {
  let { studentId, tutorId } = req.query;
  const getMessage = `SELECT MESSAGE,SENT_AT FROM MESSAGING WHERE (SENDER_ID = ${studentId} AND RECIEVER_ID = ${tutorId}) OR (SENDER_ID = ${tutorId} AND RECIEVER_ID = ${studentId}) ORDER BY SENT_AT ASC`;
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

module.exports.getMessagingList = async (req,res) =>{
  let { userId } = req.query;
  const dbPromise = util.promisify(dbConnection.query).bind(dbConnection);

  let sqlGetContacts = `SELECT SENDER_ID,RECIEVER_ID
  FROM MESSAGING
  WHERE SENDER_ID = ${userId} OR RECIEVER_ID = ${userId}
  GROUP BY SENDER_ID,RECIEVER_ID
  ORDER BY SENT_AT DESC`

  let contacts = null;
  let contactedIds = [];
  try
  {
    contacts = await dbPromise(sqlGetContacts);
  }
  catch(err)
  {
    throw err;
  }

  for (contact of contacts)
  {
    let itemtoPush = null
    if(contact.SENDER_ID != userId)
    {
      itemtoPush = contact.SENDER_ID
    }
    else if(contact.RECIEVER_ID != userId)
    {
      itemtoPush = contact.RECIEVER_ID
    }
    if(!contactedIds.includes(itemtoPush))
    {
      contactedIds.push(itemtoPush);
    }    
  }

  let response = []
  for(contactedId of contactedIds)
  {
    let sqlGetContactDetails = `SELECT u.NAME,u.IMAGE FROM USER u WHERE u.USER_ID = ${contactedId} `;
    let sqlGetLastMessage = `SELECT MESSAGE,SENT_AT FROM MESSAGING WHERE (SENDER_ID = ${userId} AND RECIEVER_ID = ${contactedId}) OR (SENDER_ID = ${contactedId}  AND RECIEVER_ID = ${userId}) ORDER BY SENT_AT DESC LIMIT 1`;
    let contactDetails = null;
    let lastMessageDetails = null;
    try
    {
      contactDetails = await dbPromise(sqlGetContactDetails)
    }
    catch(err)
    {
      throw err
    }

    try
    {
      lastMessageDetails = await dbPromise(sqlGetLastMessage)
    }
    catch(err)
    {
      throw err
    }

    console.log(contactDetails);
    console.log(lastMessageDetails);
    let userDetail = {
      userId : contactedId,
      userName : contactDetails[0].NAME,
      profilePicture : contactDetails[0].IMAGE,
      timestamp : lastMessageDetails[0].SENT_AT,
      lastMessage : lastMessageDetails[0].MESSAGE
    }


    response.push(userDetail);
  }


  res.json(response);
}
