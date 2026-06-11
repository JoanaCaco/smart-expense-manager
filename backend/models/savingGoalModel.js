const mongoose = require("mongoose");

// Saving goal schema defines a financial goal for the logged in user
const savingGoalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        title: {
            type: String,
            required: [true, "Title is required"],
        },

        targetAmount: {
            type: Number,
            required: [true, "Target amount is required"],
        },

        currentAmount: {
            type: Number,
            default: 0,
        },

        deadline: {
            type: Date,
        },

        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("SavingGoal", savingGoalSchema);