import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import './FinalCTA.css';

interface FinalCTAProps {
    persona?: 'SME' | 'Lender';
}

const FinalCTA: React.FC<FinalCTAProps> = ({ persona }) => {
    const title = persona === 'Lender' 
        ? "Ready to transform your lending portfolio?" 
        : "Ready to transform your business?";
    
    const tag = persona === 'Lender' 
        ? "Join the network" 
        : "Join the revolution";
    
    const count = persona === 'Lender' 
        ? "50+ Financial Institutions" 
        : "2,000+ SMEs";

    return (
        <section className="final-cta-section">
            <div className="cta-tag">
                <Zap size={14} fill="currentColor" />
                {tag}
            </div>
            
            <h2 className="cta-title">
                {title.split(' ').map((word, i) => (
                    <span key={i} className={word.toLowerCase().includes('business') || word.toLowerCase().includes('portfolio') ? 'highlight' : ''}>
                        {word}{' '}
                    </span>
                ))}
            </h2>

            <div style={{ marginBottom: '40px' }}>
                <a href={persona === 'Lender' ? "#" : "#register"} className="btn-final">
                    {persona === 'Lender' ? "Partner with us" : "Get started for free"} <ArrowRight size={24} />
                </a>
            </div>

            <p className="cta-trust-line">No credit card required.</p>

            <div className="social-proof">
                <div className="avatar-group">
                    <div className="avatar">JD</div>
                    <div className="avatar">MK</div>
                    <div className="avatar">SW</div>
                    <div className="avatar">+</div>
                </div>
                <span className="proof-text">Join {count} across East Africa</span>
            </div>
        </section>
    );
};

export default FinalCTA;
