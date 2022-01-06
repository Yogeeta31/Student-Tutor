const { Router } = require("express");
const moderatorController = require("../controllers/moderatorController");
const SecureAPI = require("../middleware/secureAPI");
const { roleCheck } = require("../middleware/roleChecker");

const router = Router();

router.patch(
  "/approval",
  SecureAPI(),
  roleCheck(["MODERATOR"]),
  moderatorController.approve_tutor_patch
);

module.exports = router;
