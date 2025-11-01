import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isValidEmail,
  isValidPhone,
  hashPassword,
  saveUserToLocal,
} from "./utils";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) return setError("Please enter a valid email address.");
    if (!isValidPhone(phone)) return setError("Enter a valid phone number (7-15 digits).");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    // still hash the password (optional use later)
    const pwHash = await hashPassword(password);

    const user = {
      id: Date.now(),
      email,
      phone,
      password, // 👈 store plain password for your frontend
      passwordHash: pwHash,
      createdAt: new Date().toLocaleString(),
    };

    saveUserToLocal(user);

    setEmail("");
    setPhone("");
    setPassword("");
    navigate("/users");
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register New User</h2>
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button type="submit" className="register-btn">
            Save User
          </button>
        </form>
      </div>
    </div>
  );
}
