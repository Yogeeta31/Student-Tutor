const { Router } = require("express");
const studentController = require("../controllers/studentController");
const SecureAPI = require("../middleware/secureAPI");
const { roleCheck } = require("../middleware/roleChecker");

const router = Router();

router.get(
  "/getStudentDetails",
  SecureAPI(),
  roleCheck(["MODERATOR", "STUDENT", "TUTOR"]),
  studentController.getStudentDetails
);

router.patch(
  "/updateStudentDetails",
  SecureAPI(),
  roleCheck(["STUDENT"]),
  studentController.updateStudentDetails
);

module.exports = router;
