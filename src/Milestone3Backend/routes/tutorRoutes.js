const { Router } = require("express");
const tutorController = require("../controllers/tutorController");
const SecureAPI = require("../middleware/secureAPI");
const { roleCheck } = require("../middleware/roleChecker");

const router = Router();

router.get(
  "/getTutorDetails",
  //   SecureAPI(),
  //   roleCheck(["MODERATOR", "STUDENT", "TUTOR"]),
  tutorController.getTutorDetails
);


router.post(
    "/getRejectionReason",
    // SecureAPI(),
    // roleCheck(["MODERATOR"]),
    tutorController.getRejectionReason
  );

router.post(
    "/getMessageFromConn",
    // SecureAPI(),
    // roleCheck(["MODERATOR"]),
    tutorController.getMessageFromConn
  );

  router.get(
    "/getTutorReviews",
    SecureAPI(),
    roleCheck(["TUTOR"]),
    tutorController.getTutorReviews
  );

module.exports = router;
