const { Router } = require("express");
const router = Router();
const authRoutes = require("./authRoutes");
const searchRoutes = require("./searchRoutes");
const moderatorRoutes = require('./moderatorRoutes');

router.use("/api/search", searchRoutes);
router.use("/api", authRoutes);
router.use("/api",moderatorRoutes);

module.exports = router;
