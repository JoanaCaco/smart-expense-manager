const mongoose = require("mongoose");

// User schema defines how user documents will be stored in MongoDB
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    {
        // Automatically adds createdAt and updatedAt fields
        timestamps: true,
    }
);

// Export the User model so it can be used in controllers
module.exports = mongoose.model("User", userSchema);