import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Register from "./Register";
import UsersList from "./UsersList";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" end>
          Register
        </NavLink>
        <NavLink to="/users">Saved Users</NavLink>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
