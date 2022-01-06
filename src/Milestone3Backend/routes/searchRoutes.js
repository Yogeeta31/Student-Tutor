const { Router } = require("express");
const searchController = require("../controllers/searchController");
const router = Router();
const SecureAPI = require("../middleware/secureAPI");

router.get("/tutors", SecureAPI(), searchController.search_tutor_get);

module.exports = router;
