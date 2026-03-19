import React, { useState } from 'react';
import { Package, DollarSign, Briefcase, Shield, User } from 'lucide-react';
import './FAQSection.css';

interface FAQ {
    q: string;
    a: string;
}

interface FAQSectionProps {
    persona?: 'SME' | 'Lender';
}

const smeFaqs: FAQ[] = [
    { q: "What is Inua360 and how does it work?", a: "Inua360 is an AI-powered business intelligence platform designed specifically for Kenyan SMEs. It combines real-time data monitoring with advanced credit scoring to help you understand your business health and access funding faster." },
    { q: "What should I use Inua360 for?", a: "Use Inua360 to monitor your daily sales records, track inventory levels, ensure tax compliance, and build a credit-ready business profile that lenders trust." },
    { q: "How much does it cost to use?", a: "Inua360 offers a free basic health report. Premium features, including real-time monitoring and direct lender matching, are available through our monthly subscription plans." },
    { q: "Is my financial data safe?", a: "We use bank-grade encryption and strictly follow Kenyan data protection laws. Your data is only shared with lenders you explicitly choose to connect with." },
    { q: "How long does it take to get a health report?", a: "Instantly. Once you connect your data sources or upload your records, our AI generates your initial health score and insights in seconds." }
];

const lenderFaqs: FAQ[] = [
    { q: "How reliable is the SME telemetry data?", a: "Our telemetry data is pulled directly from verified POS, inventory, and accounting systems. We use AI to detect anomalies and ensure we are providing lenders with the highest accuracy of operational data." },
    { q: "Can I customize my risk criteria?", a: "Yes, the Inua360 Partner Portal allows institutions to define their own risk thresholds and filtering criteria to match their specific portfolio mandates." },
    { q: "How do I access the lender partner portal?", a: "Qualified financial institutions can apply for partner access. Once vetted, you'll receive credentials to our secure monitoring and matching dashboard." },
    { q: "What sectors do you cover?", a: "Our AI is trained across diverse sectors including Retail, Manufacturing, Agribusiness, and Services, providing deep sector-specific risk insights." },
    { q: "How does the matching algorithm work?", a: "We match SMEs based on their funding readiness score and operational performance against your specific lending requirements, reducing your underwriting overhead." }
];

const FAQSection: React.FC<FAQSectionProps> = ({ persona }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const faqs = persona === 'Lender' ? lenderFaqs : smeFaqs;

    return (
        <section className="faq-section" id="faq">
            <h2 className="faq-title">Frequently asked questions</h2>
            
            <div className="faq-container">
                {faqs.map((faq, idx) => (
                    <div 
                        key={idx} 
                        className={`faq-item ${activeIndex === idx ? 'active' : ''}`}
                        onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                    >
                        <div className="faq-question">
                            {faq.q}
                            <span className="faq-icon">+</span>
                        </div>
                        <div className="faq-answer">
                            {faq.a}
                        </div>
                    </div>
                ))}
            </div>

            <div className="explore-more" style={{ marginTop: '60px', opacity: 0.5, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Explore more FAQs
            </div>

            <div className="faq-categories">
                <div className="faq-cat-pill cat-product"><Package size={14} /> Platform</div>
                <div className="faq-cat-pill cat-pricing"><DollarSign size={14} /> Pricing</div>
                <div className="faq-cat-pill cat-cases"><Briefcase size={14} /> Benefits</div>
                <div className="faq-cat-pill cat-security"><Shield size={14} /> Security</div>
                <div className="faq-cat-pill cat-account"><User size={14} /> Login</div>
            </div>
        </section>
    );
};

export default FAQSection;
