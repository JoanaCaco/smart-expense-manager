const express = require("express");

const router = express.Router();

const {
    getBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
} = require("../controllers/budgetController");

const { protect } = require("../middleware/authMiddleware");

// Budget routes
router.route("/")
    .get(protect, getBudgets)
    .post(protect, createBudget);

router.route("/:id")
    .put(protect, updateBudget)
    .delete(protect, deleteBudget);

module.exports = router;