import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import UsersList from "./UsersList";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12, background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: 12 }}>Register</Link>
        <Link to="/users">Saved Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </BrowserRouter>
  );
}
