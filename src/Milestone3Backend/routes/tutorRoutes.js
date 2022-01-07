const { Router } = require("express");
const tutorController = require("../controllers/tutorController");
const SecureAPI = require("../middleware/secureAPI");
const { roleCheck } = require("../middleware/roleChecker");

const router = Router();

router.get(
    "/getTutorDetails",
    SecureAPI(),
    tutorController.getTutorDetails
);

module.exports = router;
