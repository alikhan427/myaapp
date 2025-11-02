import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; // Make sure Navbar component exists
import Home from "./Home";
import About from "./About";
import Register from "./Register";
import UsersList from "./UsersList";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar is shown on all pages */}
      <Navbar />

      {/* Main content area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
