const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getCurrentUser,
} = require("../controllers/userController");

// Importing the protect middleware to secure routes that require authentication
const { protect } = require("../middleware/authMiddleware");

// User authentication routes
// @desc    Register a new user
router.post("/", registerUser);

// @desc    Authenticate a user and get a token
router.post("/login", loginUser);

// @desc    Get the current logged in user
router.get("/current", protect,  getCurrentUser);

module.exports = router;