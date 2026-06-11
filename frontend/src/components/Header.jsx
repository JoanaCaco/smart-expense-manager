import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../store/slices/userSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Smart Expense Manager</Link>
            </div>

            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/transactions">Transactions</Link>
                        </li>
                        <li>
                            <Link to="/budgets">Budgets</Link>
                        </li>
                        <li>
                            <Link to="/saving-goals">Saving Goals</Link>
                        </li>
                        <li>
                            <button className="btn-logout" onClick={handleLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default Header;