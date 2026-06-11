const asyncHandler = require("express-async-handler");
const Budget = require("../models/budgetModel");

// Get budgets
const getBudgets = asyncHandler(async (req, res) => {
    const budgets = await Budget.find({ user: req.user.id });

    res.status(200).json(budgets);
});

// Create budget
const createBudget = asyncHandler(async (req, res) => {
    const { category, month, limit } = req.body;

    if (!category || !month || !limit) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }

    const budget = await Budget.create({
        user: req.user.id,
        category,
        month,
        limit,
    });

    res.status(201).json(budget);
});

// Update budget
const updateBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
        res.status(404);
        throw new Error("Budget not found");
    }

    if (budget.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedBudget = await Budget.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedBudget);
});

// Delete budget
const deleteBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
        res.status(404);
        throw new Error("Budget not found");
    }

    if (budget.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await Budget.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
};