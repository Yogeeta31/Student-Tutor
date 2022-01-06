module.exports.sendMessageRequest = async (req, res) => {
  let { studentId, tutorId, remarks, message } = req.body;
};

module.exports.approveMessageRequest = async (req, res) => {};

module.exports.getAllMessages = async (req, res) => {};

module.exports.getAllConnections = async (req, res) => {};

module.exports.checkConnections = async (req, res) => {
  let { studentId, tutorId } = req.body;

  const chkConnection = ``;
};
