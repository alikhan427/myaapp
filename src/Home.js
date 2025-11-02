import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to your Register page
  };

  const scrollToHowItWorks = () => {
    document.querySelector(".how-it-works").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Earn Online Easily!</h1>
          <p>
            Join our platform and start earning from home. First 50 people to register get a 
            <span className="highlight"> $50 bonus!</span>
          </p>
          <button className="cta-button" onClick={handleRegisterClick}>
            Register Now
          </button>
          <button className="cta-button secondary" onClick={scrollToHowItWorks}>
            Learn More
          </button>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/500x400" alt="Online Earning" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Register</h3>
            <p>Create your account in a few simple steps.</p>
          </div>
          <div className="step">
            <h3>2. Start Tasks</h3>
            <p>Complete online tasks, surveys, or small gigs.</p>
          </div>
          <div className="step">
            <h3>3. Earn Money</h3>
            <p>Get paid directly to your account and enjoy bonuses.</p>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="bonus-section">
        <h2>Special Bonus</h2>
        <p>
          Be among the first <strong>50 people</strong> to register and receive a 
          <span className="highlight"> $50 bonus!</span>
        </p>
        <button className="cta-button" onClick={handleRegisterClick}>
          Register & Claim Bonus
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Platform Features</h2>
        <div className="feature-cards">
          <div className="feature-card animate">
            <h3>Fast Payouts</h3>
            <p>Receive your earnings quickly via multiple payment options.</p>
          </div>
          <div className="feature-card animate">
            <h3>Easy Tasks</h3>
            <p>Complete simple tasks or gigs and earn extra cash online.</p>
          </div>
          <div className="feature-card animate">
            <h3>Secure Platform</h3>
            <p>We ensure your data and payments are safe and secure.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-final">
        <h2>Start Earning Today!</h2>
        <button className="cta-button" onClick={handleRegisterClick}>
          Register Now
        </button>
      </section>

    </div>
  );
};

export default Home;
