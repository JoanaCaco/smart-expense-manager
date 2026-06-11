const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Generate JWT token for authenticated users
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// @desc    Register new user
const registerUser = asyncHandler(async (req, res) => {
    // Destructuring the name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

      // Generate a salt and hash the password using bcrypt before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

     // Create a new user in the database with the provided name, email, and hashed password
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // Send response if user was created successfully
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

   // Check if a user with the provided email exists in the database
    const user = await User.findOne({ email });

    // Compare entered password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

// @desc    Get current logged in user
const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};