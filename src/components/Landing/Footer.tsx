import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        {/* ── NEWSLETTER BAND ── */}
        <div className="footer-top">
          <div className="footer-newsletter-left">
            <div className="footer-newsletter-label">Stay Ahead</div>
            <h3 className="footer-newsletter-heading">
              SME insights, funding tips &amp;<br /><em>platform updates.</em>
            </h3>
          </div>
          <div className="footer-newsletter-form">
            <input type="email" placeholder="Enter your business email" />
            <button>Subscribe →</button>
          </div>
        </div>

        {/* ── MAIN COLUMNS ── */}
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand-col">
            <a href="#" className="footer-logo">
              <img src="/logo.png" alt="Inua360 Logo" className="h-10 w-auto" />
              <div className="footer-logo-text">
                <div className="footer-logo-sub" style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>AI Business Intelligence</div>
              </div>
            </a>
            <p className="footer-brand-desc">
              An AI-powered platform helping Kenya's SMEs understand their business health, stay compliant, and access the right funding opportunities — faster.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-btn" title="Twitter / X">𝕏</a>
              <a href="#" className="footer-social-btn" title="LinkedIn">in</a>
              <a href="#" className="footer-social-btn" title="Facebook">f</a>
              <a href="#" className="footer-social-btn" title="Instagram">◎</a>
              <a href="#" className="footer-social-btn" title="YouTube">▶</a>
            </div>
          </div>

          {/* Product */}
          <div className="footer-nav-col">
            <div className="footer-col-title">Product</div>
            <ul className="footer-nav-list">
              <li><a href="#">Business Health Report</a></li>
              <li><a href="#">Smart Alerts <span className="footer-nav-tag">LIVE</span></a></li>
              <li><a href="#">Funding Navigator</a></li>
              <li><a href="#">Compliance Tracker</a></li>
              <li><a href="#">Cash-Flow Forecaster</a></li>
              <li><a href="#">Profile Builder</a></li>
              <li><a href="#">AI Advisor <span className="footer-nav-tag">NEW</span></a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-nav-col">
            <div className="footer-col-title">Company</div>
            <ul className="footer-nav-list">
              <li><a href="#">About Inua360</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Partners &amp; Lenders</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press &amp; Media</a></li>
              <li><a href="#">Blog &amp; Insights</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-nav-col">
            <div className="footer-col-title">Support</div>
            <ul className="footer-nav-list">
              <li><a href="#">Help Centre</a></li>
              <li><a href="#">Getting Started</a></li>
              <li><a href="#">API Documentation</a></li>
              <li><a href="#">System Status</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Community Forum</a></li>
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Inua360. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <div className="footer-legal-sep"></div>
            <a href="#">Terms of Service</a>
            <div className="footer-legal-sep"></div>
            <a href="#">Cookie Policy</a>
            <div className="footer-legal-sep"></div>
            <a href="#">Data Protection</a>
          </div>
          <div className="footer-made-in">
            <span className="footer-flag">🇰🇪</span> Built with purpose in Nairobi, Kenya
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;