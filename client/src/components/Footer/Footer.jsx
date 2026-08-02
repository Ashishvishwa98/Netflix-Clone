import React, { useState } from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
const exploreLinks = ["Help Center", "Account", "Ways to Watch", "Only on Netflix"];
const legalLinks = ["Cookie Preferences", "Privacy Policy", "Terms of Use", "Gift Card Terms", "Legal Notices", "Corporate Information"];
const supportLinks = ["FAQ", "Speed Test", "Contact Us", "Jobs", "Media Center", "Investor Relations"];

export default function NetflixLanding() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    navigate("/signup",{state: { email }});
  };

  return (
    <div className="nf-page">
      {/* Hero Section */}
      <section className="nf-hero">
        <div className="nf-hero-content">
          <h1 className="nf-hero-title">
            Gain Access to unlimited movies, TV shows, and more.
          </h1>

          <div className="nf-signup">
            <div className="nf-email-wrapper">
              <span className="nf-email-icon" aria-hidden="true">
                ✉
              </span>
              <input
                type="email"
                className="nf-email-input"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="nf-cta-btn" onClick={handleGetStarted}>
              GET STARTED
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="nf-footer">
        <div className="nf-footer-top">
          <div className="nf-footer-brand">
            <div className="nf-logo">NETFLIX</div>
            <div className="nf-location">
              <span className="nf-pin" aria-hidden="true">
                📍
              </span>
              Netflix Nigeria
            </div>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        <div className="nf-language-select">
          <span className="nf-globe-icon" aria-hidden="true">
            🌐
          </span>
          <select>
            <option>English</option>
          </select>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="nf-footer-col">
      <h4 className="nf-footer-heading">{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}