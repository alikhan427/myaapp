import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside (optional enhancement)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.navbar')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <header className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">💼</span>
          EarnOnline
        </div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink 
            to="/register" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
            onClick={closeMenu}
          >
            Register
          </NavLink>
          <NavLink 
            to="/users" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
            onClick={closeMenu}
          >
            Users
          </NavLink>
        </div>

        {/* Hamburger Menu */}
        <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;