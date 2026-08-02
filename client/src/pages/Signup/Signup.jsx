import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
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

  const handleSignup = async () => {
    if (!user.name || !user.email || !user.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://netflix-backend-bkz0.onrender.com/api/auth/signup",
        user
      );

      toast.success(res.data.message || "Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup-box">
        <h1>Sign Up</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
        />

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

        <button onClick={handleSignup} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span>Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;