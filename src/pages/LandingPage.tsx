import React from 'react';
import Navbar from '../components/Landing/Navbar';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import Comparison from '../components/Landing/Comparison';
import WaitlistSection from '../components/Landing/WaitlistSection';
import FAQSection from '../components/Landing/FAQSection';
import FinalCTA from '../components/Landing/FinalCTA';
import ScrollToTop from '../components/Landing/ScrollToTop';
import Footer from '../components/Landing/Footer';
import LogoMarquee from '../components/Landing/LogoMarquee';
import SMEFeatures from '../components/Landing/SMEFeatures';
import LenderFeatures from '../components/Landing/LenderFeatures';
import HowItWorks from '../components/Landing/HowItWorks';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Navbar persona="SME" />
      <main>
        <Hero />
        <LogoMarquee />
        <Features />
        
        {/* Screenshot 1: For Small Businesses */}
        <SMEFeatures />
        
        <Comparison /> {/* "The Inua360 Advantage" */}

        {/* Screenshot 3: How It Works */}
        <HowItWorks />
        
        {/* Screenshot 2: For Lenders */}
        <LenderFeatures />

        <WaitlistSection persona="SME" />
        <FAQSection persona="SME" />
        <FinalCTA persona="SME" />
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default LandingPage;