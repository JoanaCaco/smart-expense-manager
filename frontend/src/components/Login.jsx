import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { setUser } from "../store/slices/userSlice";
import { useLoginMutation } from "../store/apis/userApi";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await login(formData);

        if (response.error) {
            toast.error(response.error.data?.message || "Login failed");
        } else {
            dispatch(setUser(response.data));
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success(`Welcome ${response.data.name}!`);
            navigate("/");
        }
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login to manage your expenses</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-block"
                            disabled={isLoading}
                        >
                            {isLoading ? "Please wait..." : "Login"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;