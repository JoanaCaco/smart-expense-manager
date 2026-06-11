const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

// Dashboard route is protected because statistics belong to the logged in user
router.get("/", protect, getDashboardStats);

module.exports = router;