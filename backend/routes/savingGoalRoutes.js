const express = require("express");
const router = express.Router();

const {
    getSavingGoals,
    createSavingGoal,
    updateSavingGoal,
    deleteSavingGoal,
} = require("../controllers/savingGoalController");

const { protect } = require("../middleware/authMiddleware");

// Saving goal routes
router
    .route("/")
    .get(protect, getSavingGoals)
    .post(protect, createSavingGoal);

router
    .route("/:id")
    .put(protect, updateSavingGoal)
    .delete(protect, deleteSavingGoal);

module.exports = router;