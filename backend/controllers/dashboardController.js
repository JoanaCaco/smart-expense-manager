const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const Budget = require("../models/budgetModel");
const SavingGoal = require("../models/savingGoalModel");

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
    // Get all user transactions
    const transactions = await Transaction.find({ user: req.user.id });

    // Get all user budgets
    const budgets = await Budget.find({ user: req.user.id });

    // Get all user saving goals
    const savingGoals = await SavingGoal.find({ user: req.user.id });

    // Calculate total income
    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    // Calculate total expenses
    const totalExpenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    // Calculate current balance
    const balance = totalIncome - totalExpenses;

    // Calculate saving goals progress
    const totalSaved = savingGoals.reduce(
        (total, goal) => total + goal.currentAmount,
        0
    );

    const totalTarget = savingGoals.reduce(
        (total, goal) => total + goal.targetAmount,
        0
    );

    const savingProgress =
        totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

    // Calculate budget savings and overspending
    let totalBudgetSavings = 0;
    let totalOverspending = 0;

    const budgetSummary = budgets.map((budget) => {
        const categoryExpenses = transactions
            .filter(
                (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === budget.category
            )
            .reduce((total, transaction) => total + transaction.amount, 0);

        const remaining = budget.limit - categoryExpenses;

        if (remaining >= 0) {
            totalBudgetSavings += remaining;
        } else {
            totalOverspending += Math.abs(remaining);
        }

        return {
            _id: budget._id,
            category: budget.category,
            month: budget.month,
            limit: budget.limit,
            spent: categoryExpenses,
            remaining,
        };
    });

    res.status(200).json({
        totalIncome,
        totalExpenses,
        balance,
        totalSaved,
        totalTarget,
        savingProgress,
        totalBudgetSavings,
        totalOverspending,
        budgetSummary,
        totalTransactions: transactions.length,
        totalBudgets: budgets.length,
        totalSavingGoals: savingGoals.length,
    });
});

module.exports = { getDashboardStats };