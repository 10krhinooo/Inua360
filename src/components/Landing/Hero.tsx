import React from 'react';
import { Activity, BellRing, Landmark, ShieldCheck } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-tagstrip">
            <span className="hero-tag-pill">
              <Activity size={14} className="text-[#2E9B4E]" />
              Kenya's #1 SME Health Platform
            </span>
          </div>
          
          <h1 className="hero-headline">
            Know Your Business Health. <br />
            <span>Access Funding Faster.</span>
          </h1>
          
          <p className="hero-description">
            Inua360 uses AI to monitor your SMEs' vital signs, ensure compliance, and match you with the right lenders when you're ready to grow.
          </p>

          <div className="hero-cta-group">
            <a href="/register" className="btn-primary">
              Get Your Health Report Free →
            </a>
            <a href="#how-it-works" className="btn-secondary">
              See How It Works
            </a>
          </div>

          <div className="hero-trust">
            <span className="trust-txt">Trusted features:</span>
            <div className="trust-icons">
              <div className="trust-item"><ShieldCheck size={16} /> Credit Scoring</div>
              <div className="trust-item"><BellRing size={16} /> Real-time Alerts</div>
              <div className="trust-item"><Landmark size={16} /> Lender Matching</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;