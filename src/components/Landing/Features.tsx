import React from 'react';
import { Activity, BellRing, Landmark } from 'lucide-react';
import './Features.css';

const Features: React.FC = () => {
    return (
        <section className="features-section">
            <div className="features-header">
                <div className="features-eyebrow">
                    <span className="features-eyebrow-dot"></span>
                    Built for SME Growth
                </div>
                <h2 className="features-headline">Why SMEs Need <span>Inua360</span></h2>
                <p className="features-subheadline">The 3 killer features that drive sign-ups</p>
            </div>

            <div className="features-cards">
                <div className="features-card">
                    <div className="features-badge" style={{ background: '#ecfdf5', color: '#10b981' }}>
                        <Activity size={24} />
                    </div>
                    <div className="features-card-title">
                        Instant Business Health Report
                    </div>
                    <p className="features-card-desc">
                        Get a detailed overview of your business performance, from growth potential to operational efficiency.
                    </p>
                    <ul className="features-list">
                        <li className="features-list-item"><span className="features-check" style={{ color: '#10b981' }}>✓</span> Full Report & Insights</li>
                        <li className="features-list-item"><span className="features-check" style={{ color: '#10b981' }}>✓</span> Clear Health Score</li>
                    </ul>
                </div>

                <div className="features-card">
                    <div className="features-badge" style={{ background: '#fff7ed', color: '#F07B20' }}>
                        <BellRing size={24} />
                    </div>
                    <div className="features-card-title">
                        Smart Alerts & Monitoring
                    </div>
                    <p className="features-card-desc">
                        Stay informed with real-time notifications about sales drops, inventory warnings, and revenue milestones.
                    </p>
                    <ul className="features-list">
                        <li className="features-list-item"><span className="features-check" style={{ color: '#F07B20' }}>✓</span> Real-Time Alerts</li>
                        <li className="features-list-item"><span className="features-check" style={{ color: '#F07B20' }}>✓</span> Continuous Tracking</li>
                    </ul>
                </div>

                <div className="features-card">
                    <div className="features-badge" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                        <Landmark size={24} />
                    </div>
                    <div className="features-card-title">
                        Funding Readiness & Loans
                    </div>
                    <p className="features-card-desc">
                        Track your funding readiness and get matched with top-tier lenders when your score is strong.
                    </p>
                    <ul className="features-list">
                        <li className="features-list-item"><span className="features-check" style={{ color: '#3b82f6' }}>✓</span> Funding Readiness Score</li>
                        <li className="features-list-item"><span className="features-check" style={{ color: '#3b82f6' }}>✓</span> Connect to Lenders</li>
                    </ul>
                </div>
            </div>

            <div className="features-bottom-strip">
                <p className="features-tagline">
                    <span className="ag">Understand Your Business</span> •
                    <span className="ao">Avoid Risks</span> •
                    <span className="ab">Get Funded</span>
                </p>
                <div className="features-cta-group">
                    <a href="/register" className="btn-p">Get Started Free →</a>
                    <a href="#" className="btn-s">Scale Your Impact</a>
                </div>
                <div className="features-logo-wrap">
                    <img src="/logo.png" alt="Inua360 Logo" className="h-10 w-auto" />
                    <div>
                        <div className="features-logo-sub">AI Business Intelligence</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;