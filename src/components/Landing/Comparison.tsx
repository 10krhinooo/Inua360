import React from 'react';
import './Comparison.css';

const tradData = [
  { item: 'Credit Scoring', trad: 'Manual/Traditional', inua: 'AI-Powered REAL-TIME' },
  { item: 'Business Insights', trad: 'Monthly/Yearly', inua: 'INSTANT Daily Health' },
  { item: 'Funding Access', trad: 'Slow & Opaque', inua: 'FAST & PRE-VETTED' },
  { item: 'Risk Monitoring', trad: 'Reactive', inua: 'PROACTIVE ALERTS' },
];

const Comparison: React.FC = () => {
  return (
    <section className="comparison-section" id="how-it-works">
      <div className="comp-header">
        <h2 className="comp-title">The <span>Inua360</span> Advantage</h2>
        <p className="comp-subtitle">How we compare to traditional business tools</p>
      </div>

      <div className="comp-container">
        {/* Header Row */}
        <div className="comp-grid comp-header-row">
          <div className="comp-cell">Intelligence Feature</div>
          <div className="comp-cell">Traditional Method</div>
          <div className="comp-cell inua-cell" style={{ justifyContent: 'center' }}>Inua360 Platform</div>
        </div>

        {/* Data Rows */}
        {tradData.map((row, idx) => (
          <div className="comp-grid" key={idx}>
            <div className="comp-cell feature-cell">{row.item}</div>
            <div className="comp-cell trad-cell">{row.trad}</div>
            <div className="comp-cell inua-cell" style={{ justifyContent: 'center' }}>{row.inua}</div>
          </div>
        ))}
      </div>

      <div className="comp-footer">
        <p className="comp-cta-text">Ready to experience the future of SME intelligence?</p>
        <a href="/register" className="btn-cta">Analyze Your Business Now →</a>
      </div>
    </section>
  );
};

export default Comparison;
