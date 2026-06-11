const mongoose = require("mongoose");

// Budget schema defines monthly spending limits
const budgetSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        category: {
            type: String,
            required: [true, "Category is required"],
        },

        month: {
            type: String,
            required: [true, "Month is required"],
        },

        limit: {
            type: Number,
            required: [true, "Budget limit is required"],
        },

        spent: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Budget", budgetSchema);