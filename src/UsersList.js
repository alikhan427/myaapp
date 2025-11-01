import React, { useState, useEffect } from "react";
import { getUsersFromLocal, clearUsers } from "./utils";
import { useNavigate } from "react-router-dom";
import "./UsersList.css";

const PAGE_PASSWORD = "5566778899"; // ✅ New required password

export default function UsersList() {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("users_list_unlocked") === "true");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (unlocked) {
      setUsers(getUsersFromLocal());
    } else {
      setUsers([]);
    }
  }, [unlocked]);

  // ✅ Clear all saved users
  function handleClear() {
    if (window.confirm("Are you sure you want to delete all users?")) {
      clearUsers();
      setUsers([]);
      navigate(0);
    }
  }

  // ✅ Unlock page
  function handleUnlock(e) {
    e.preventDefault();
    if (input === PAGE_PASSWORD) {
      sessionStorage.setItem("users_list_unlocked", "true");
      setUnlocked(true);
      setInput("");
      setError("");
    } else {
      setError("❌ Incorrect password. Try again.");
    }
  }

  // ✅ Lock page again
  function handleLock() {
    sessionStorage.removeItem("users_list_unlocked");
    setUnlocked(false);
    setInput("");
  }

  return (
    <div className="userslist-page">
      <div className="userslist-container">
        <h2 className="userslist-title">🔐 Saved Users (Local Storage)</h2>

        {!unlocked ? (
          <form className="unlock-card" onSubmit={handleUnlock}>
            <h3>Enter Access Password</h3>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter password"
              className="password-input"
              required
            />
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" className="unlock-btn">Unlock Access</button>
          </form>
        ) : (
          <div className="table-section fade-in">
            <div className="top-actions">
              <button className="clear-btn" onClick={handleClear}>🗑 Clear All</button>
              <button className="lock-btn" onClick={handleLock}>🔒 Lock Page</button>
            </div>

            {users.length === 0 ? (
              <p className="no-users">No users saved yet.</p>
            ) : (
              <div className="table-wrapper">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Created At</th>
                      <th>Password</th>
                      <th>Password Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>{new Date(u.createdAt).toLocaleString()}</td>
                        <td>{u.password}</td>
                        <td className="hash">{u.passwordHash}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
