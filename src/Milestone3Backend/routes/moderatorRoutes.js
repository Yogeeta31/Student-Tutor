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

router.get(
  "/approvedTutors",
  // SecureAPI(),
  // roleCheck(["MODERATOR"]),
  moderatorController.listOfApprovedTutors
);

router.get(
  "/notVerifiedTutors",
  // SecureAPI(),
  // roleCheck(["MODERATOR"]),
  moderatorController.listOfNotVerifiedTutors
);

router.post(
  "/rejectProfileWithReason",
  // SecureAPI(),
  // roleCheck(["MODERATOR"]),
  moderatorController.rejectProfileWithReason
);

router.post(
  "/banProfile",
  // SecureAPI(),
  // roleCheck(["MODERATOR"]),
  moderatorController.banProfile
);

router.put(
  "/liftUpBan",
  // SecureAPI(),
  // roleCheck(["MODERATOR"]),
  moderatorController.liftupBan
);

router.get(
  "/getEnrolledStudents",
  // SecureAPI(),
  // roleCheck(["MODERATOR"]),
  moderatorController.getEnrolledStudents
);

router.post(
  "/approveNewContent",
  // SecureAPI(),
  // roleCheck(["MODERATOR"]),
  moderatorController.approveNewContent
);

module.exports = router;
