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

router.patch(
  "/updateTutorDetails",
  SecureAPI(),
  roleCheck(["TUTOR"]),
  tutorController.updateTutorDetails
);

router.patch(
  "/updateTutorSubjects",
  SecureAPI(),
  roleCheck(["TUTOR"]),
  tutorController.updateTutorSubjects
);

router.patch(
  "/updateTutorCV",
  SecureAPI(),
  roleCheck(["TUTOR"]),
  tutorController.updateTutorCV
);

router.patch(
  "/updateTutorImage",
  SecureAPI(),
  roleCheck(["TUTOR"]),
  tutorController.updateTutorImage
);

router.post(
  "/addNewSubject",
  SecureAPI(),
  roleCheck(["TUTOR"]),
  tutorController.addNewSubject
);

router.delete(
  "/deleteExistingSubject",
  SecureAPI(),
  roleCheck(["TUTOR"]),
  tutorController.deleteExistingSubject
);
router.get(
  "/getReviewOptions",
  SecureAPI(),
  roleCheck(["STUDENT"]),
  tutorController.getReviewOptions
);

router.post(
  "/reviewTutor",
  SecureAPI(),
  roleCheck(["STUDENT"]),
  tutorController.reviewTutor
);

module.exports = router;
