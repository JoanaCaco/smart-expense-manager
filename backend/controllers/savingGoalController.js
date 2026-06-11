const asyncHandler = require("express-async-handler");
const SavingGoal = require("../models/savingGoalModel");

// Get saving goals
const getSavingGoals = asyncHandler(async (req, res) => {
    const goals = await SavingGoal.find({ user: req.user.id }).sort({
        createdAt: -1,
    });

    res.status(200).json(goals);
});

// Create saving goal
const createSavingGoal = asyncHandler(async (req, res) => {
    const { title, targetAmount, currentAmount, deadline } = req.body;

    if (!title || !targetAmount) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }

    const goal = await SavingGoal.create({
        user: req.user.id,
        title,
        targetAmount,
        currentAmount,
        deadline,
    });

    res.status(201).json(goal);
});

// Update saving goal
const updateSavingGoal = asyncHandler(async (req, res) => {
    const goal = await SavingGoal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error("Saving goal not found");
    }

    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedGoal = await SavingGoal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedGoal);
});

// Delete saving goal
const deleteSavingGoal = asyncHandler(async (req, res) => {
    const goal = await SavingGoal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error("Saving goal not found");
    }

    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await SavingGoal.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getSavingGoals,
    createSavingGoal,
    updateSavingGoal,
    deleteSavingGoal,
};
