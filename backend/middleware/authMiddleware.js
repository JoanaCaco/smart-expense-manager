const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Middleware to protect private routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if authorization header exists and starts with Bearer
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token using JWT secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by id and exclude password from the response
            req.user = await User.findById(decoded.id).select("-password");

            // Move to the next middleware/controller
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized");
        }
    }

    // No token was provided
    if (!token) {
        res.status(401);
        throw new Error("No token provided");
    }
});

module.exports = { protect };