import React from 'react';
import './LogoMarquee.css';

import { EquityLogo, KCBLogo, TalaLogo, BranchLogo, PezeshaLogo } from './PartnerLogos';

const LogoMarquee: React.FC = () => {
    return (
        <div className="logo-marquee-container">
            <div className="logo-marquee-label">Our customers get funded by</div>
            <div className="logo-marquee-wrapper">
                <div className="logo-marquee-content">
                    {/* Render twice for seamless loop */}
                    {[...Array(3)].map((_, i) => (
                        <React.Fragment key={i}>
                            <div className="logo-item"><EquityLogo /></div>
                            <div className="logo-item"><KCBLogo /></div>
                            <div className="logo-item"><TalaLogo /></div>
                            <div className="logo-item"><BranchLogo /></div>
                            <div className="logo-item"><PezeshaLogo /></div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoMarquee;
