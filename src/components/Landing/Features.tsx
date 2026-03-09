import { useEffect, useState, useRef } from 'react';
import { Activity, BellRing, Landmark } from 'lucide-react';
import './Features.css';

const CIRC = 2 * Math.PI * 26; // ~163.4

const healthData = [
  { score: 78, lbl: 'Good', bars: [85, 60, 70, 25], labels: ['High', 'Moderate', 'Ready', 'Low'] },
  { score: 83, lbl: 'Strong', bars: [89, 73, 81, 18], labels: ['High', 'Good', 'Ready', 'Very Low'] },
  { score: 71, lbl: 'Fair', bars: [75, 52, 62, 40], labels: ['Moderate', 'Low', 'Pending', 'Medium'] },
  { score: 92, lbl: 'Excellent', bars: [95, 88, 94, 10], labels: ['High', 'High', 'Ready', 'Minimal'] },
];

const alertBank = [
  { icon: '⚠', cls: 'ic-red', title: 'Sales Drop Alert!', sub: 'Revenue ↓12% vs yesterday', isNew: true },
  { icon: '📦', cls: 'ic-yellow', title: 'Inventory Low Warning!', sub: 'Stock at 8% — reorder advised', isNew: false },
  { icon: '💸', cls: 'ic-orange', title: 'Cost Surge Detected!', sub: 'Operating costs +18% this week', isNew: false },
  { icon: '📊', cls: 'ic-blue', title: 'Revenue Milestone Hit!', sub: 'Monthly target 95% achieved', isNew: false },
  { icon: '⚡', cls: 'ic-purple', title: 'Cash Flow Alert!', sub: 'Runway projected: 42 days', isNew: true },
  { icon: '✅', cls: 'ic-green', title: 'Payment Received', sub: 'KES 84,000 cleared to account', isNew: false },
  { icon: '🔔', cls: 'ic-red', title: 'Late Payment Risk!', sub: 'Invoice #204 overdue 3 days', isNew: true },
  { icon: '📈', cls: 'ic-green', title: 'Profit Margin Up', sub: 'Net margin improved to 22.4%', isNew: false },
  { icon: '⚠', cls: 'ic-yellow', title: 'Tax Deadline Approaching', sub: 'VAT return due in 4 days', isNew: false },
  { icon: '🏦', cls: 'ic-blue', title: 'Lender Match Found!', sub: '3 new offers match your profile', isNew: true },
  { icon: '🛒', cls: 'ic-orange', title: 'High Cart Abandonment', sub: '68% abandonment rate today', isNew: true },
  { icon: '💡', cls: 'ic-purple', title: 'Cost-Saving Opportunity', sub: 'Switch suppliers to save 9%', isNew: false },
];

const fundData = [
  { pct: 72, score: 72, lbl: 'Good — Eligible for most loans' },
  { pct: 86, score: 86, lbl: 'Excellent — Premium rates unlocked' },
  { pct: 61, score: 61, lbl: 'Fair — 2 lenders match your profile' },
  { pct: 93, score: 93, lbl: 'Outstanding — Top-tier lender access' },
];

const lenders = [
  { icon: '🏦', name: 'KCB Bank', amt: 'Up to KES 2M', rate: '12.5%', bc: 'bm', bt: 'MATCH' },
  { icon: '💳', name: 'Equity Finance', amt: 'Up to KES 500K', rate: '14.0%', bc: 'bn', bt: 'NEW' },
  { icon: '🌿', name: 'NCBA Growth', amt: 'Up to KES 1.5M', rate: '11.8%', bc: 'bm', bt: 'MATCH' },
];

const Features = () => {
    // Health State
    const [hIdx, setHIdx] = useState(0);
    const [hScore, setHScore] = useState(0);
    const [hDisplayScore, setHDisplayScore] = useState(0);
    const [hShowMetrics, setHShowMetrics] = useState(false);
    const ringRef = useRef<SVGCircleElement>(null);

    // Alerts State
    const [alerts, setAlerts] = useState<any[]>([]);
    const [alertCursor, setAlertCursor] = useState(0);
    const [clockTime, setClockTime] = useState('09:41');

    // Funding State
    const [fIdx, setFIdx] = useState(0);
    const [fScore, setFScore] = useState(0);
    const [fDisplayScore, setFDisplayScore] = useState(0);
    const [fShowLenders, setFShowLenders] = useState(false);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const n = new Date();
            setClockTime(n.getHours().toString().padStart(2, '0') + ':' + n.getMinutes().toString().padStart(2, '0'));
        }, 1000);
        return () => clearInterval(timeInterval);
    }, []);

    // Health Logic
    useEffect(() => {
        const runHealth = () => {
            const ds = healthData[hIdx];
            setHScore(ds.score);
            setHShowMetrics(false);

            // Animate score counter
            let start = hDisplayScore;
            let end = ds.score;
            let duration = 1400;
            let steps = 45;
            let stepTime = duration / steps;
            let currentStep = 0;

            const counter = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                setHDisplayScore(Math.round(start + (end - start) * progress));
                if (currentStep >= steps) clearInterval(counter);
            }, stepTime);

            setTimeout(() => setHShowMetrics(true), 180);
        };

        runHealth();
        const interval = setInterval(() => {
            setHIdx(prev => (prev + 1) % healthData.length);
        }, 5500);
        return () => clearInterval(interval);
    }, [hIdx]);

    // Alerts Logic
    useEffect(() => {
        // Initial seeds
        setAlerts([
            { ...alertBank[1], id: Math.random(), isNew: false },
            { ...alertBank[2], id: Math.random(), isNew: false },
            { ...alertBank[3], id: Math.random(), isNew: false }
        ]);

        const interval = setInterval(() => {
            const nextAlert = { ...alertBank[alertCursor % alertBank.length], id: Math.random(), isNew: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setAlerts(prev => {
                const updated = [nextAlert, ...prev];
                if (updated.length > 4) return updated.slice(0, 4);
                return updated;
            });
            setAlertCursor(prev => prev + 1);
        }, 2600);
        return () => clearInterval(interval);
    }, [alertCursor]);

    // Funding Logic
    useEffect(() => {
        const runFunding = () => {
            const ds = fundData[fIdx];
            setFScore(ds.score);
            setFShowLenders(false);

            // Animate score counter
            let start = fDisplayScore;
            let end = ds.score;
            let duration = 1400;
            let steps = 45;
            let stepTime = duration / steps;
            let currentStep = 0;

            const counter = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                setFDisplayScore(Math.round(start + (end - start) * progress));
                if (currentStep >= steps) clearInterval(counter);
            }, stepTime);

            setTimeout(() => setFShowLenders(true), 950);
        };

        runFunding();
        const interval = setInterval(() => {
            setFIdx(prev => (prev + 1) % fundData.length);
        }, 6200);
        return () => clearInterval(interval);
    }, [fIdx]);

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
                {/* CARD 1: HEALTH */}
                <div className="features-card card-green">
                    <div className="features-badge">
                        <Activity size={18} />
                    </div>
                    <div className="features-card-title">Instant Business Health Report</div>
                    <div className="features-mockup">
                        <div className="health-mockup">
                            <div className="laptop-screen">
                                <div className="screen-header">
                                    <span className="screen-title-txt">Business Health Score</span>
                                    <span className="live-badge">LIVE</span>
                                </div>
                                <div className="score-row">
                                    <div className="ring-wrap">
                                        <svg viewBox="0 0 62 62">
                                            <circle className="ring-track" cx="31" cy="31" r="26" />
                                            <circle 
                                                className="ring-fill" 
                                                cx="31" 
                                                cy="31" 
                                                r="26" 
                                                style={{ strokeDashoffset: CIRC - (hScore / 100) * CIRC }}
                                            />
                                        </svg>
                                        <div className="ring-center">
                                            <span className="s-num">{hDisplayScore || '—'}</span>
                                            <span className="s-lbl">{healthData[hIdx].lbl}</span>
                                        </div>
                                    </div>
                                    <div className="score-desc">
                                        <strong>Your Score</strong>
                                        Business healthy & growing with strong fundamentals.
                                    </div>
                                </div>
                                {healthData[hIdx].bars.map((w, i) => (
                                    <div className="metric-row" key={i}>
                                        <span className="m-label">{['Growth Potential', 'Operational Efficiency', 'Funding Readiness', 'Compliance Risk'][i]}</span>
                                        <div className="m-bar-bg">
                                            <div className={`m-bar ${['bg', 'by', 'bt', 'br'][i]}`} style={{ width: hShowMetrics ? `${w}%` : '0%' }}></div>
                                        </div>
                                        <span className={`m-val ${['vg', 'vy', 'vt', 'vr'][i]} ${hShowMetrics ? 'show' : ''}`}>
                                            {healthData[hIdx].labels[i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <ul className="features-list">
                        <li className="features-list-item"><span className="features-check">✓</span> Full Report & Insights</li>
                        <li className="features-list-item"><span className="features-check">✓</span> Clear Health Score</li>
                    </ul>
                </div>

                {/* CARD 2: ALERTS */}
                <div className="features-card card-orange">
                    <div className="features-badge">
                        <BellRing size={18} />
                    </div>
                    <div className="features-card-title">Smart Alerts & Monitoring</div>
                    <div className="features-mockup">
                        <div className="phone-wrap">
                            <div className="phone-screen">
                                <div className="status-bar">
                                    <span className="s-time">{clockTime}</span>
                                    <span style={{ fontSize: '9px' }}>📶 🔋</span>
                                </div>
                                <div className="alert-feed">
                                    {alerts.map((a) => (
                                        <div key={a.id} className="a-chip in">
                                            <div className={`a-icon ${a.cls}`}>{a.icon}</div>
                                            <div className="a-body">
                                                <div className="a-title">{a.title}</div>
                                                <div className="a-sub">{a.sub}</div>
                                            </div>
                                            {a.isNew && <span className="new-tag">NEW</span>}
                                            <span className="a-time">{a.isNew ? 'just now' : (a.time || clockTime)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="features-list">
                        <li className="features-list-item"><span className="features-check">✓</span> Real-Time Alerts</li>
                        <li className="features-list-item"><span className="features-check">✓</span> Continuous Tracking</li>
                    </ul>
                </div>

                {/* CARD 3: FUNDING */}
                <div className="features-card card-blue">
                    <div className="features-badge">
                        <Landmark size={18} />
                    </div>
                    <div className="features-card-title">Funding Readiness & Loans</div>
                    <div className="features-mockup">
                        <div className="fund-screen">
                            <div className="fund-hdr">
                                <span className="fund-ttl">Funding Dashboard</span>
                                <span className="fund-live">SCANNING</span>
                            </div>
                            <div className="g-label">Funding Readiness Score</div>
                            <div className="g-bar-bg">
                                <div className="g-bar" style={{ width: `${fScore}%` }}></div>
                            </div>
                            <div className="g-score">{fDisplayScore}</div>
                            <div className="g-score-lbl">{fDisplayScore > 0 ? fundData[fIdx].lbl : 'Calculating…'}</div>
                            <div className="lenders">
                                {fShowLenders && lenders.map((l, i) => (
                                    <div key={i} className="l-row show">
                                        <span className="l-icon">{l.icon}</span>
                                        <div className="l-info">
                                            <div className="l-name">{l.name}</div>
                                            <div className="l-amt">{l.amt}</div>
                                        </div>
                                        <span className="l-rate">{l.rate} p.a</span>
                                        <span className={`l-badge ${l.bc} show`}>{l.bt}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={`cline ${fShowLenders ? 'show' : ''}`}></div>
                        </div>
                    </div>
                    <ul className="features-list">
                        <li className="features-list-item"><span className="features-check">✓</span> Funding Readiness Score</li>
                        <li className="features-list-item"><span className="features-check">✓</span> Connect to Lenders</li>
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
                    <a href="#" className="btn-p">Get Started Free →</a>
                    <a href="#" className="btn-s">See How It Works</a>
                </div>
                <div className="features-logo-wrap">
                    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
                        <path d="M20 4C11.163 4 4 11.163 4 20s7.163 16 16 16 16-7.163 16-16S28.837 4 20 4z" stroke="#2E9B4E" strokeWidth="2" />
                        <path d="M14 20c0-3.314 2.686-6 6-6" stroke="#2E9B4E" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M26 20c0 3.314-2.686 6-6 6" stroke="#F07B20" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="20" cy="20" r="3" fill="#1B6FBF" />
                    </svg>
                    <div>
                        <div className="features-logo-name">Inua360</div>
                        <div className="features-logo-sub">AI Business Intelligence</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;