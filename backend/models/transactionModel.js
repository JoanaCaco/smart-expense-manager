const mongoose = require("mongoose");

// Transaction schema defines how income and expense records are stored
const transactionSchema = mongoose.Schema(
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

        amount: {
            type: Number,
            required: [true, "Amount is required"],
        },

        type: {
            type: String,
            required: [true, "Type is required"],
            enum: ["income", "expense"],
        },

        category: {
            type: String,
            required: [true, "Category is required"],
        },

        date: {
            type: Date,
            default: Date.now,
        },

        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);