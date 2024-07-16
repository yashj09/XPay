const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const accountRoutes = require("./accountRoutes");
const authMiddleware = require("../Middleware/authMiddleware");

router.use("/user", authRoutes);
router.use("/account", accountRoutes);

module.exports = router;
