import React from 'react';
import { Shield, Zap, BarChart3, ShieldCheck, Users } from 'lucide-react';
import './Features.css';

const LenderFeatures: React.FC = () => {
  const features = [
    {
      title: 'ML Risk Scoring',
      description: 'Advanced algorithms that look beyond credit scores to predict repayment with 94% accuracy.',
      icon: BarChart3,
      stats: '94% Accuracy'
    },
    {
      title: 'Fraud Detection',
      description: 'Real-time monitoring of business transactions and identity verification.',
      icon: ShieldCheck,
      stats: 'Real-time'
    },
    {
      title: 'SME Network',
      description: 'Access to thousands of pre-vetted Kenyan SMEs ready for growth capital.',
      icon: Users,
      stats: '5,000+ SMEs'
    },
    {
      title: 'Automated Compliance',
      description: 'Integrated KYC/B and local regulatory reporting tools.',
      icon: Shield,
      stats: 'KYC/B Ready'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <span className="badge">For Lenders</span>
          <h2>Digital Infrastructure for Lending</h2>
          <p>
            Reduce your operational costs and increase your yield with our 
            end-to-end SME credit assessment platform.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <feature.icon />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-footer">
                <span className="feature-stats">{feature.stats}</span>
                <Zap size={16} className="text-[#F07B20]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LenderFeatures;
