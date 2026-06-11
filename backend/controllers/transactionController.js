const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");

// @desc    Get all transactions for logged in user
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
        createdAt: -1,
    });

    res.status(200).json(transactions);
});

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
const createTransaction = asyncHandler(async (req, res) => {
    const { title, amount, type, category, date, notes } = req.body;

    // Validate required fields
    if (!title || !amount || !type || !category) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }

    // Create transaction linked to the logged in user
    const transaction = await Transaction.create({
        user: req.user.id,
        title,
        amount,
        type,
        category,
        date,
        notes,
    });

    res.status(201).json(transaction);
});

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error("Transaction not found");
    }

    // Check if transaction belongs to logged in user
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTransaction);
});

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error("Transaction not found");
    }

    // Check if transaction belongs to logged in user
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};