import React from 'react';
import { ArrowRight } from 'lucide-react';
import './WaitlistSection.css';

interface WaitlistSectionProps {
    persona?: 'SME' | 'Lender';
}

const WaitlistSection: React.FC<WaitlistSectionProps> = ({ persona }) => {
    return (
        <section className="waitlist-section" id="join-waitlist">
            <span className="waitlist-eyebrow">Join early</span>
            <h2 className="waitlist-title">
                Join the <span>waitlist</span>
            </h2>
            <p className="waitlist-subtitle">
                Be among the first to access Inua360. Your input shapes what we build for {persona === 'Lender' ? 'financial institutions' : 'SMEs'} in Kenya.
            </p>

            <form className="waitlist-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="form-input" 
                        placeholder="Your name" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="form-input" 
                        placeholder="your@email.com" 
                        required 
                    />
                </div>

                <div className="form-group form-full">
                    <label htmlFor="persona">I am a... *</label>
                    <select id="persona" className="form-select" required defaultValue={persona || ""}>
                        <option value="" disabled>Select one</option>
                        <option value="SME">SME Founder / Owner</option>
                        <option value="Lender">Bank / Financial Institution</option>
                        <option value="Partner">Developer / Partner</option>
                    </select>
                </div>

                <div className="form-actions form-full">
                    <button type="submit" className="btn-continue">
                        Join Waitlist <ArrowRight size={20} />
                    </button>
                    <button 
                        type="button" 
                        className="btn-share"
                        onClick={() => {
                            const url = window.location.origin + window.location.pathname + '#join-waitlist';
                            navigator.clipboard.writeText(url);
                            alert('Waitlist link copied to clipboard!');
                        }}
                    >
                        Share Link
                    </button>
                </div>

                <p className="waitlist-privacy">
                    We care about your privacy. <a href="#">Privacy Policy</a>
                </p>
            </form>
        </section>
    );
};

export default WaitlistSection;
