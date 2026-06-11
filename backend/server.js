const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./connect/database");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

// Setting the port for the server
const PORT = process.env.PORT || 8000;

// Initializing the Express application
const app = express();

app.use(cors());
// Middleware to read JSON data from request body
// Middleware to parse JSON bodies in requests
app.use(express.json());

// Middleware to parse URL-encoded bodies in requests
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Smart Expense Manager API Running");
});

// Importing user routes
app.use("/api/users", require("./routes/userRoutes"));

// Importing transactions routes
app.use("/api/transactions", require("./routes/transactionRoutes"));

// Importing budget routes
app.use("/api/budgets", require("./routes/budgetRoutes"));

// Importing saving goal routes
app.use("/api/saving-goals", require("./routes/savingGoalRoutes"));

app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.use(errorHandler);

// Starting the server and listening on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});