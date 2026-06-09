const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connect/database");

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
    res.send("Smart Expense Manager API Running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});