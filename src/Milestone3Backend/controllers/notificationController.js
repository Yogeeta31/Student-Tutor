const dbConnection = require("../db");
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
