import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

import { useNavigate } from "react-router-dom";
import API from "../api/api";


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     console.log("Registration successful:", formData);
  //     // backend integration later
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Registration failed",
      });
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

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


          <button className="auth-btn">Register</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
