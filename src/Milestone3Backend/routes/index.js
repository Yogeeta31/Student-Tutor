const { Router } = require("express");
const router = Router();
const authRoutes = require("./authRoutes");
const searchRoutes = require("./searchRoutes");

router.use("/api/search", searchRoutes);
router.use("/api", authRoutes);

module.exports = router;
