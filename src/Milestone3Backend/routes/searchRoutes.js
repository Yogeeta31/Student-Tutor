const { Router } = require("express");
const searchController = require("../controllers/searchController");
const router = Router();
const SecureAPI = require("../middleware/secureAPI");
const { roleCheck } = require("../middleware/roleChecker");

router.get(
  "/tutors",
  searchController.search_tutor_get
);

module.exports = router;
