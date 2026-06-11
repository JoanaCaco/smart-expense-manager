# Smart Expense Manager

## Project Overview

Smart Expense Manager is a full-stack web application designed to help users manage their personal finances effectively. The application allows users to track income and expenses, create monthly budgets, define savings goals, and monitor their financial progress through an interactive dashboard.

The system provides secure user authentication and ensures that each user can only access and manage their own financial information.

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* Secure password hashing using bcrypt

### Dashboard

* Display total income
* Display total expenses
* Calculate current balance
* Display remaining budget
* Show total amount saved
* Calculate savings progress
* Budget summary overview

### Transactions

* Add new transactions
* View all transactions
* Edit existing transactions
* Delete transactions
* Categorize transactions as income or expense

### Budgets

* Create monthly budgets by category
* Update budget limits
* Delete budgets
* Track spending against predefined budgets

### Saving Goals

* Create savings goals
* Update savings goals
* Track saving progress
* Delete savings goals

---

## Technologies Used

### Frontend

* React
* React Router DOM
* Redux Toolkit
* Redux Toolkit Query (RTK Query)
* React Toastify
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Token (JWT)
* bcryptjs

---

## Project Structure

SmartExpenseManager
│
├── frontend
│   ├── public
│   └── src
│       ├── components
│       └── store
│           ├── apis
│           └── slices
│
└── backend
    ├── connect
    ├── controllers
    ├── middleware
    ├── models
    ├── routes
    └── utils
```

---

## Installation Guide

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-expense-manager.git
```
---

### Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file containing:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend server:

```bash
npm run dev
```

---

### Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend application:

```bash
npm run dev
```

---

## Database Design

The application uses four main collections.

### Users

Stores user authentication information.

Fields:

* name
* email
* password

### Transactions

Stores user income and expense records.

Fields:

* user
* title
* amount
* type
* category
* date
* notes

### Budgets

Stores monthly budget limits for different categories.

Fields:

* user
* category
* month
* limit
* spent

### Saving Goals

Stores savings objectives defined by users.

Fields:

* user
* title
* targetAmount
* currentAmount
* deadline
* completed

---

## Security Implementation

The application implements several security mechanisms:

* Password hashing using bcrypt
* JWT authentication
* Protected backend routes
* User ownership validation before update or deletion operations

---

## Conclusion

Smart Expense Manager provides users with a practical solution for organizing and monitoring their personal finances. Through the integration of secure authentication, budgeting capabilities, savings management, and real-time financial insights, the application demonstrates the implementation of modern full-stack web development technologies and best practices.

---

## Author

Joana Caco

Project: Smart Expense Manager

Technologies: React • Redux Toolkit • RTK Query • Node.js • Express.js • MongoDB Atlas
