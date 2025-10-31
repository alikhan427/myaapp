import React from "react";
import { getUsersFromLocal, clearUsers } from "./utils";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const users = getUsersFromLocal();
  const navigate = useNavigate();

  function handleClear() {
    if (window.confirm("Delete all users?")) {
      clearUsers();
      navigate(0);
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h2>Saved Users (Local Storage)</h2>
      <button onClick={handleClear}>Clear All</button>
      {users.length === 0 ? (
        <p>No users saved yet.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Password Hash</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
                <td style={{ wordBreak: "break-all" }}>{u.passwordHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
