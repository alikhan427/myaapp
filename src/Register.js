import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPhone, hashPassword, saveUserToLocal } from "./utils";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) return setError("Enter a valid email.");
    if (!isValidPhone(phone)) return setError("Enter a valid phone number.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    const pwHash = await hashPassword(password);
    const user = { id: Date.now(), email, phone, passwordHash: pwHash, createdAt: new Date().toISOString() };
    saveUserToLocal(user);

    setEmail(""); setPhone(""); setPassword("");
    navigate("/users");
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Register User (Frontend Only)</h2>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone</label><br />
          <input value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>Save</button>
      </form>
    </div>
  );
}
