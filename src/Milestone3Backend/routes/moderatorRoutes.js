const { Router } = require("express");
const moderatorController = require('../controllers/moderatorController');

const router = Router();

router.patch("/approval", moderatorController.approve_tutor_patch);

module.exports = router;