const { Router } = require("express");
const router = Router();
const MessageController = require("../controllers/messageController");
const { roleCheck } = require("../middleware/roleChecker");
const SecureAPI = require("../middleware/secureAPI");

router.post(
  "/sendMessageRequest",
  SecureAPI(),
  roleCheck(["STUDENT"]),
  MessageController.sendMessageRequest
);
router.get(
  "/checkConnections",
  SecureAPI(),
  MessageController.checkConnections
);
router.get(
  "/getAllConnections",
  SecureAPI(),
  MessageController.getAllConnections
);
router.patch(
  "/changeMessageStatus",
  SecureAPI(),
  MessageController.changeMessageRequestStatus
);

router.get(
  "/getAllMessages",
  SecureAPI(),
  MessageController.getAllMessages
);

router.get(
  "/getMessagingList",
  SecureAPI(),
  MessageController.getMessagingList
);

module.exports = router;
