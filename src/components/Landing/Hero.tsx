import React from 'react';
import { Activity, BellRing, Landmark } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-wrapper">
      <div className="hero-inner">

        <h1 className="hero-headline">
          <span className="hero-hl-line">Understand Your Business.</span>
          <span className="hero-hl-line">
            Avoid Risks. <span className="hero-hl-orange">Get Funded.</span>
          </span>
        </h1>

        <div className="hero-tagstrip">
          <div className="hero-tag-item hi">
            <Activity size={18} className="hero-tag-icon" strokeWidth={2.5} />
            Health Reports
          </div>
          <span className="hero-tag-sep"></span>
          <div className="hero-tag-item">
            <BellRing size={18} className="hero-tag-icon" strokeWidth={2.5} />
            Smart Alerts
          </div>
          <span className="hero-tag-sep"></span>
          <div className="hero-tag-item hi">
            <Landmark size={18} className="hero-tag-icon" strokeWidth={2.5} />
            Lender Matching
          </div>
        </div>

        <p className="hero-description">
          Connect your data to unlock <strong>instant health reports</strong>,
          smart alerts, and personalized lender matching. 
        </p>

        <div className="hero-cta-group">
          <a href="/register" className="hero-btn-primary">
            Get Started for Free
          </a>
          <a href="/login" className="hero-btn-secondary">
            Log in to Dashboard <span className="hero-btn-arrow">→</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;