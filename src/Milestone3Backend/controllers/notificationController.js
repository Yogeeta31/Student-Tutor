const dbConnection = require("../db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

module.exports.createNotification = async ({ tutorId, title, description }) => {
  try {
    let notification = await query(
      `INSERT INTO NOTIFICATIONS (TITLE,DESCRIPTION,RECEIVER_ID) VALUES('${title}','${description}',${tutorId})`
    );
    if (notification) {
      return 1;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getNotifications = async (req, res) => {
  let { tutorId } = req.body;
  try {
    let notification = await query(
      `SELECT * FROM NOTIFICATIONS WHERE RECEIVER_ID=${tutorId} ORDER BY SENT_AT LIMIT 100`
    );
    notification = JSON.parse(JSON.stringify(notification));
    return notification;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getNotificationDetail = async (req, res) => {};

module.exports.sendNotificationSocket = (data, callback) => {
  let { tutorId, title, description } = data;
  let createNotification = `INSERT INTO NOTIFICATIONS (TITLE,DESCRIPTION,RECEIVER_ID) VALUES('${title}','${description}',${tutorId})`;
  dbConnection.query(createNotification, (err, result) => {
    if (err) {
      console.log(err);
    }
    let fetchNotification = `SELECT NOTIFICATION_ID,SENT_AT FROM NOTIFICATIONS WHERE RECEIVER_ID=${tutorId} ORDER BY SENT_AT DESC LIMIT 1`;
    dbConnection.query(fetchNotification, (err, result) => {
      if (err) {
        console.log(err);
      }
      let timestamp = JSON.parse(JSON.stringify(result));
      timestamp = timestamp[0];
      callback({
        tutorId,
        title,
        description,
        notificationId: timestamp.NOTIFICATION_ID,
        timestamp: {
          sentAt: timestamp.SENT_AT,
        },
      });
      return;
    });
  });
};

module.exports.getNotificationSocket = (data, callback) => {
  let { tutorId } = data;
  let fetchNotification = `SELECT * FROM NOTIFICATIONS WHERE RECEIVER_ID=${tutorId} ORDER BY SENT_AT LIMIT 100`;
  dbConnection.query(fetchNotification, (err, result) => {
    if (err) {
      console.log(err);
    }
    let notification = JSON.parse(JSON.stringify(result));
    callback(notification);
    return;
  });
};
