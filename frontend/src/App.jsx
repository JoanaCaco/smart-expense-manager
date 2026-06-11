import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Transactions from "./components/Transactions";
import Budgets from "./components/Budgets";
import SavingGoals from "./components/SavingGoals";

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Header />

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/budgets" element={<Budgets />} />
                    <Route path="/saving-goals" element={<SavingGoals />} />
                </Routes>
            </div>

            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;