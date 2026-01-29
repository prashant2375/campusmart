import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";



function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  //Dummy login
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     //temp login before backend
  //     login({
  //       email: formData.email,
  //       role: formData.email === "admin@campus.com" ? "admin" : "user",
  //     });

  //     navigate("/");

  //     console.log("Login successful:", formData);
  //     // backend integration later
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      login(res.data.token, res.data.user);
      navigate("/");
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
