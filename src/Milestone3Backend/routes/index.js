const { Router } = require("express");
const router = Router();
const authRoutes = require("./authRoutes");
const tutorRoutes = require("./tutorRoutes");
const searchRoutes = require("./searchRoutes");
const moderatorRoutes = require('./moderatorRoutes');
const messageRoutes = require('./messageRoutes');

router.use("/api/search", searchRoutes);
router.use("/api", authRoutes);
router.use("/api", tutorRoutes);
router.use("/api",moderatorRoutes);
router.use("/api/message",messageRoutes);

module.exports = router;
