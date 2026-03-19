import React from 'react';
import { BarChart3, ShieldCheck, Users } from 'lucide-react';
import './Hero.css'; // Reusing base styles but with specific content

const LenderHero: React.FC = () => {
  return (
    <section className="hero-section" style={{ background: '#f8fafc' }}>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-tagstrip">
            <span className="hero-tag-pill" style={{ background: '#eef2ff', color: '#3730a3', borderColor: '#c7d2fe' }}>
              <BarChart3 size={14} />
              Built for Financial Institutions
            </span>
          </div>
          
          <h1 className="hero-headline">
            Advanced SME Credit Intelligence. <br />
            <span>Eliminate Default Risk.</span>
          </h1>
          
          <p className="hero-description">
            Access real-time operational telemetry and qualified SME pipelines. 
            Inua360 provides the deep insights you need to optimize your lending portfolio.
          </p>

          <div className="hero-cta-group">
            <a href="/register" className="btn-primary">
              Apply for Partner Portal →
            </a>
            <a href="#features" className="btn-secondary">
              See Risk Indicators
            </a>
          </div>

          <div className="hero-trust">
            <span className="trust-txt">Powering Lenders with:</span>
            <div className="trust-icons">
              <div className="trust-item"><ShieldCheck size={16} /> Credit Risk Index</div>
              <div className="trust-item"><BarChart3 size={16} /> Portfolio Monitoring</div>
              <div className="trust-item"><Users size={16} /> Vetted Lead Pipeline</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LenderHero;
