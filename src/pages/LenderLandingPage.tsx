import React, { useEffect } from 'react';
import Navbar from '../components/Landing/Navbar';
import LenderHero from '../components/Landing/LenderHero';
import LenderFeatures from '../components/Landing/LenderFeatures';
import LenderComparison from '../components/Landing/LenderComparison';
import WaitlistSection from '../components/Landing/WaitlistSection';
import FAQSection from '../components/Landing/FAQSection';
import FinalCTA from '../components/Landing/FinalCTA';
import ScrollToTop from '../components/Landing/ScrollToTop';
import Footer from '../components/Landing/Footer';

const LenderLandingPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar persona="Lender" />
            <main>
                <LenderHero />
                <LenderFeatures />
                <LenderComparison />
                <WaitlistSection persona="Lender" />
                <FAQSection persona="Lender" />
                <FinalCTA persona="Lender" />
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default LenderLandingPage;
