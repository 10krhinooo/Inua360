import React from 'react';
import type { FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { useWaitlistSubmit } from '../../hooks/useWaitlistSubmit';
import './WaitlistSection.css';

interface WaitlistSectionProps {
    persona?: 'SME' | 'Lender';
}

const WaitlistSection: React.FC<WaitlistSectionProps> = ({ persona }) => {
    const { submit, status } = useWaitlistSubmit('landing-waitlist');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const name = String(fd.get('name') ?? '').trim();
        const email = String(fd.get('email') ?? '').trim();
        const personaVal = String(fd.get('persona') ?? '').trim();
        await submit({
            name,
            email,
            persona: personaVal,
        });
    };

    if (status === 'success') {
        return (
            <section className="waitlist-section" id="join-waitlist">
                <span className="waitlist-eyebrow">Thank you</span>
                <h2 className="waitlist-title">
                    You&apos;re on the <span>waitlist</span>
                </h2>
                <p className="waitlist-subtitle">
                    We&apos;ll email you when Inua360 opens up. Tell a friend — every voice helps us build the right product for Kenyan SMEs.
                </p>
            </section>
        );
    }

    return (
        <section className="waitlist-section" id="join-waitlist">
            <span className="waitlist-eyebrow">Join early</span>
            <h2 className="waitlist-title">
                Join the <span>waitlist</span>
            </h2>
            <p className="waitlist-subtitle">
                Be among the first to access Inua360. Your input shapes what we build for {persona === 'Lender' ? 'financial institutions' : 'SMEs'} in Kenya.
            </p>

            <form className="waitlist-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input 
                        type="text" 
                        name="name"
                        id="name" 
                        className="form-input" 
                        placeholder="Your name" 
                        required 
                        disabled={status === 'loading'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input 
                        type="email" 
                        name="email"
                        id="email" 
                        className="form-input" 
                        placeholder="your@email.com" 
                        required 
                        disabled={status === 'loading'}
                    />
                </div>

                <div className="form-group form-full">
                    <label htmlFor="persona">I am a... *</label>
                    <select id="persona" name="persona" className="form-select" required defaultValue={persona || ""} disabled={status === 'loading'}>
                        <option value="" disabled>Select one</option>
                        <option value="SME">SME Founder / Owner</option>
                        <option value="Lender">Bank / Financial Institution</option>
                        <option value="Partner">Developer / Partner</option>
                    </select>
                </div>

                <div className="form-actions form-full">
                    <button type="submit" className="btn-continue" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Sending…' : <>Join Waitlist <ArrowRight size={20} /></>}
                    </button>
                    <button 
                        type="button" 
                        className="btn-share"
                        disabled={status === 'loading'}
                        onClick={() => {
                            const url = window.location.origin + window.location.pathname + '#join-waitlist';
                            void navigator.clipboard.writeText(url);
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
