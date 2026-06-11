import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { setUser } from "../store/slices/userSlice";
import { useRegisterMutation } from "../store/apis/userApi";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [register, { isLoading }] = useRegisterMutation();

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

        if (password !== password2) {
            toast.error("Passwords do not match");
            return;
        }

        const userData = {
            name,
            email,
            password,
        };

        const response = await register(userData);

        if (response.error) {
            toast.error(response.error.data?.message || "Registration failed");
        } else {
            dispatch(setUser(response.data));
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success("Registration successful");
            navigate("/");
        }
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Create an account to start tracking your finances</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                        />
                    </div>

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
                            placeholder="Enter password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name="password2"
                            value={password2}
                            placeholder="Confirm password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-block"
                            disabled={isLoading}
                        >
                            {isLoading ? "Please wait..." : "Register"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;