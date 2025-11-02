// src/UsersList.js
import React, { useEffect, useState } from "react";
import { listenToUsers, getUsersFromLocal } from "./utils";
import "./UsersList.css";

const ACCESS_PASSWORD = "0098765"; // Password to unlock page

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Load users when unlocked
  useEffect(() => {
    if (unlocked) {
      const localData = getUsersFromLocal();
      if (localData.length > 0) setUsers(localData);

      listenToUsers((data) => setUsers(data));
    }
  }, [unlocked]);

  // Unlock handler
  const handleUnlock = (e) => {
    e.preventDefault();
    if (input === ACCESS_PASSWORD) {
      setUnlocked(true);
      setError("");
      setInput("");
    } else {
      setError("❌ Incorrect password. Try again.");
    }
  };

  const handleLock = () => {
    setUnlocked(false);
    setInput("");
  };

  // Sort handler
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sorting users
  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        const aVal = a[sortConfig.key] ? a[sortConfig.key].toString().toLowerCase() : "";
        const bVal = b[sortConfig.key] ? b[sortConfig.key].toString().toLowerCase() : "";
        if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.phone?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, sortConfig, search]);

  return (
    <div className="userslist-wrapper">
      {!unlocked ? (
        <div className="unlock-card">
          <h2 className="userslist-title">🔐 Enter Access Password</h2>
          <form onSubmit={handleUnlock}>
            <input
              type="password"
              placeholder="Enter password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="password-input"
              required
            />
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" className="unlock-btn">Unlock Access</button>
          </form>
        </div>
      ) : (
        <>
          <div className="top-actions">
            <button className="lock-btn" onClick={handleLock}>🔒 Lock Page</button>
          </div>

          <h2 className="userslist-title">👥 Registered Users</h2>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          {sortedUsers.length === 0 ? (
            <p className="no-users">No users found.</p>
          ) : (
            <div className="table-container">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th onClick={() => requestSort("name")}>Name</th>
                    <th onClick={() => requestSort("email")}>Email</th>
                    <th onClick={() => requestSort("phone")}>Phone</th>
                    <th onClick={() => requestSort("createdAt")}>Created At</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user, index) => (
                    <tr
                      key={index}
                      className={index >= sortedUsers.length - 5 ? "new-user" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>{user.name || "N/A"}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}</td>
                      <td>{user.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UsersList;
