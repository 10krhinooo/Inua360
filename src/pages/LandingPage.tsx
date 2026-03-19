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

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar persona="SME" />
      <main>
        <Hero />
        <LogoMarquee />
        <Features />
        <Comparison />
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