import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginAs, setLoginAs] = useState("user"); // 🔥 NEW
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
        loginAs, // 🔥 IMPORTANT
      });

      login(res.data.token, res.data.user);

      navigate("/", { replace: true });

    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>

        {/* 🔥 USER / ADMIN TOGGLE */}
        <div className="login-type">
          <label>
            <input
              type="radio"
              checked={loginAs === "user"}
              onChange={() => setLoginAs("user")}
            />
            User
          </label>

          <label>
            <input
              type="radio"
              checked={loginAs === "admin"}
              onChange={() => setLoginAs("admin")}
            />
            Admin
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {errors.general && (
            <p className="error" style={{ textAlign: "center" }}>
              {errors.general}
            </p>
          )}

          <button className="auth-btn">Login</button>
        </form>

        <div className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
