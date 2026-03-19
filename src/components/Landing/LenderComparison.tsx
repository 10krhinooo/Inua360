import React from 'react';
import './Comparison.css';

const lenderData = [
  { item: 'SME Lead Quality', trad: 'Self-Reported Data', inua: 'Verified Operational Telemetry' },
  { item: 'Risk Monitoring', trad: 'Periodic Reviews', inua: 'Real-Time Early Warnings' },
  { item: 'Lead Conversion', trad: 'Cold Outreach', inua: 'Pre-Vetted SME Pipeline' },
  { item: 'Underwriting Cost', trad: 'High (Manual)', inua: 'LOW (Data-Driven)' },
];

const LenderComparison: React.FC = () => {
  return (
    <section className="comparison-section">
      <div className="comp-header">
        <h2 className="comp-title">The <span>Inua360</span> Advantage for Lenders</h2>
        <p className="comp-subtitle">Superior data means superior lending decisions</p>
      </div>

      <div className="comp-container">
        {/* Header Row */}
        <div className="comp-grid comp-header-row" style={{ backgroundColor: '#f1f5f9' }}>
          <div className="comp-cell">Intelligence Layer</div>
          <div className="comp-cell">Traditional Banking</div>
          <div className="comp-cell" style={{ backgroundColor: '#eff6ff', color: '#2563eb', justifyContent: 'center' }}>Inua360 Partner Portal</div>
        </div>

        {/* Data Rows */}
        {lenderData.map((row, idx) => (
          <div className="comp-grid" key={idx}>
            <div className="comp-cell feature-cell">{row.item}</div>
            <div className="comp-cell trad-cell">{row.trad}</div>
            <div className="comp-cell" style={{ background: '#fffaf5', color: '#2563eb', fontWeight: 'bold', justifyContent: 'center' }}>{row.inua}</div>
          </div>
        ))}
      </div>

      <div className="comp-footer">
        <p className="comp-cta-text">Ready to transform your SME lending portfolio?</p>
        <a href="/register" className="btn-cta" style={{ backgroundColor: '#2563eb' }}>Apply for Access Now →</a>
      </div>
    </section>
  );
};

export default LenderComparison;
