import React, { useState, useEffect } from 'react';
import Register from './Register'; // Keep the original Register form
import './About.css';

const About = () => {
  const [registeredUsers, setRegisteredUsers] = useState(0);

  // Simulate fetching user count from localStorage or backend
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    setRegisteredUsers(users.length);
  }, []);

  return (
    <div className="about-page">

      {/* About Info */}
      <section className="about-info">
        <h1>About Us</h1>
        <p>We are a team of passionate developers building amazing web applications.</p>
        <p>Our mission is to deliver high-quality software solutions that help businesses grow.</p>
      </section>

      {/* Registration Section */}
      <section className="about-register">
        <h2>Join Us & Start Earning!</h2>

        {/* Live User Counter */}
        <div className="user-counter">
          🚀 Already <strong>{registeredUsers}</strong> users registered!
        </div>

        {/* Bonus Highlight */}
        {registeredUsers < 50 && (
          <div className="bonus-notification">
            🎁 Hurry! First 50 users get a <strong>$50 bonus!</strong>
          </div>
        )}

        {/* Embed the existing Register component */}
        <Register />

      </section>
    </div>
  );
};

export default About;
