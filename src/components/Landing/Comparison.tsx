import React, { useState, useEffect, useRef } from 'react';
import './Comparison.css';

const tradData = [
  {
    icon: '✕',
    title: 'Manual Record Keeping',
    desc: 'Paper-based logs that fail to show the true strength of your business.',
  },
  {
    icon: '✕',
    title: 'Compliance Gaps',
    desc: 'Missing certificates and disorganized tax records that block funding instantly.',
  },
  {
    icon: '✕',
    title: 'Revenue Uncertainty',
    desc: 'No clear path to show lenders how you will repay, leading to high-risk rejections.',
  },
  {
    icon: '✕',
    title: 'The "Lender Lottery"',
    desc: 'Applying everywhere without knowing where you actually fit, wasting months.',
  },
  {
    icon: '✕',
    title: 'Weak Business Profiles',
    desc: 'Standard applications that fail to stand out, making your SME look high-risk to creditors.',
  },
];

const inuaData = [
  {
    icon: '✓',
    title: 'Inua360 AI Advisor',
    desc: 'Using AI to convert everyday financial activity into actionable funding intelligence.',
    tag: 'AI-Powered',
  },
  {
    icon: '✓',
    title: 'Compliance Tracker',
    desc: 'Automates compliance and documentation tracking — organizes records to keep you funding-ready.',
    tag: 'Auto-Track',
  },
  {
    icon: '✓',
    title: 'Cash-Flow Forecaster',
    desc: 'Forecasts cash flow and repayment scenarios so SMEs borrow with total confidence.',
    tag: 'Predictive',
  },
  {
    icon: '✓',
    title: 'Funding Navigator',
    desc: 'Matches businesses to the right funding opportunities based on real financial signals.',
    tag: 'Smart Match',
  },
  {
    icon: '✓',
    title: 'Profile Builder',
    desc: 'Giving entrepreneurs a clear roadmap to funding readiness. High-impact profiles funders and creditors trust.',
    tag: 'Credibility+',
  },
];

const Comparison = () => {
  const [activeSide, setActiveSide] = useState<'traditional' | 'inua'>('inua');
  const [isAuto, setIsAuto] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const btnRefs = {
    traditional: useRef<HTMLButtonElement>(null),
    inua: useRef<HTMLButtonElement>(null),
  };

  const positionSlider = () => {
    const activeBtn = btnRefs[activeSide].current;
    const track = trackRef.current;
    const slider = sliderRef.current;

    if (activeBtn && track && slider) {
      const trackRect = track.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      slider.style.left = `${btnRect.left - trackRect.left + 5}px`;
      slider.style.width = `${btnRect.width - 10}px`;
    }
  };

  useEffect(() => {
    positionSlider();
    window.addEventListener('resize', positionSlider);
    return () => window.removeEventListener('resize', positionSlider);
  }, [activeSide]);

  // Auto-toggle logic every 3 seconds
  useEffect(() => {
    if (!isAuto) return;
    const interval = setInterval(() => {
      setActiveSide((prev) => (prev === 'traditional' ? 'inua' : 'traditional'));
    }, 3000);
    return () => clearInterval(interval);
  }, [isAuto]);

  const handleManualToggle = (side: 'traditional' | 'inua') => {
    setActiveSide(side);
    setIsAuto(false);
  };

  const getSliderStyle = () => {
    if (activeSide === 'traditional') {
      return {
        background: 'rgba(255,68,68,0.15)',
        border: '1px solid rgba(255,68,68,0.3)',
      };
    }
    return {
      background: 'rgba(240,123,32,0.12)',
      border: '1px solid rgba(240,123,32,0.3)',
    };
  };

  return (
    <div className={`comparison-wrapper mode-${activeSide}`}>
      <div className="glow-orb g1"></div>
      <div className="glow-orb g2"></div>

      <div className="comparison-section">
        <div className="comp-header">
          <div className="comp-pill">
            <span className="comp-pill-dot"></span>Why It Matters
          </div>
          <h2 className="comp-headline">
            The Old Way vs. <em>The Inua360 Way</em>
          </h2>
          <p className="comp-sub">
            Traditional SME financing leaves businesses stuck. We built something entirely different.
          </p>
        </div>

        <div className="comp-toggle-wrap">
          <div className="comp-toggle-track" ref={trackRef}>
            <div 
              className="comp-toggle-slider" 
              ref={sliderRef}
              style={getSliderStyle()}
            ></div>
            <button 
              ref={btnRefs.traditional}
              className={`comp-toggle-btn ${activeSide === 'traditional' ? 'active red-mode' : ''}`}
              onClick={() => handleManualToggle('traditional')}
            >
              <span className="comp-icon-x">✕</span> Traditional
            </button>
            <button 
              ref={btnRefs.inua}
              className={`comp-toggle-btn ${activeSide === 'inua' ? 'active' : ''}`}
              onClick={() => handleManualToggle('inua')}
            >
              <span className="comp-icon-check">✓</span> Inua360
            </button>
          </div>
        </div>

        {/* SINGLE UNIFIED SPLIT CARD */}
        <div className="comp-split-card-container">
          <div className={`comp-split-card highlight-${activeSide}`}>
            <div className="card-glow-line"></div>
            
            <div className="comp-split-grid">
              {/* LEFT SIDE: TRADITIONAL */}
              <div className={`comp-side traditional ${activeSide === 'traditional' ? 'active' : ''}`}>
                <div className="comp-card-head">
                  <div className="comp-card-head-icon">⚡</div>
                  <div className="comp-card-head-text">
                    <div className="comp-card-label">The Problem</div>
                    <div className="comp-card-title">Traditional SME Financing</div>
                  </div>
                </div>
                <div className="comp-card-items">
                  {tradData.map((item, i) => (
                    <div 
                      key={i} 
                      className="comp-item"
                    >
                      <div className="comp-item-icon-wrap">{item.icon}</div>
                      <div className="item-body">
                        <div className="comp-item-title">{item.title}</div>
                        <div className="comp-item-desc">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: INUA360 */}
              <div className={`comp-side inua ${activeSide === 'inua' ? 'active' : ''}`}>
                <div className="comp-card-head">
                  <div className="comp-card-head-icon">🚀</div>
                  <div className="comp-card-head-text">
                    <div className="comp-card-label">The Solution</div>
                    <div className="comp-card-title">The Inua360 AI Solution</div>
                  </div>
                  <div className="comp-new-badge">Brand New</div>
                </div>
                <div className="comp-card-items">
                  {inuaData.map((item, i) => (
                    <div 
                      key={i} 
                      className="comp-item"
                    >
                      <div className="comp-item-icon-wrap">{item.icon}</div>
                      <div className="item-body">
                        <div className="comp-item-title">{item.title}</div>
                        <div className="comp-item-desc">{item.desc}</div>
                        {item.tag && <div className="comp-feat-tag">⚡ {item.tag}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="comp-bottom">
          <div className="comp-bottom-line"></div>
          <p className="comp-bottom-text">Ready to leave the old way <em>behind?</em></p>
          <p className="comp-bottom-sub">Join thousands of SMEs already funded through Inua360.</p>
          <a href="#" className="comp-btn-cta">
            Start for Free
            <span className="comp-btn-cta-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
