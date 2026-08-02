import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        if (!user.email || !user.password) {
            return toast.error("Please fill all fields");
        }

        try {
            setLoading(true);

            const res = await axios.post(
                "https://netflix-backend-bkz0.onrender.com/api/auth/login",
                user
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("Welcome back!");

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login-box">
                <h1>Sign In</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                />

                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <p>
                    New to Netflix?{" "}
                    <Link to="/signup">
                        <span>Sign up now.</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;