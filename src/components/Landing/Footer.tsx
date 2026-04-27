import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { Twitter, Linkedin, Facebook, Instagram, Mail } from 'lucide-react';
import { submitWaitlist } from '../../services/waitlistSubmit';
import { useToast } from '../../context/ToastContext';
import './Footer.css';

const Footer: React.FC = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  const onNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setBusy(true);
    try {
      await submitWaitlist({
        name: 'Newsletter (footer)',
        email: trimmed,
        persona: 'Newsletter',
        source: 'footer-newsletter',
      });
      setEmail('');
      addToast("Thanks — we'll send updates to your inbox.", 'success');
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Could not subscribe. Try again.',
        'error',
        8000,
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        {/* ── NEWSLETTER BAND ── */}
        <div className="footer-top">
          <div className="footer-newsletter-left">
            <div className="footer-newsletter-label">Stay Ahead</div>
            <h3 className="footer-newsletter-heading">
              SME insights, funding tips &amp;<br /><em>platform updates.</em>
            </h3>
          </div>
          <form className="footer-newsletter-form" onSubmit={onNewsletter}>
            <input
              type="email"
              name="email"
              placeholder="Enter your business email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
              disabled={busy}
              aria-label="Business email for updates"
            />
            <button type="submit" disabled={busy}>
              {busy ? '…' : 'Subscribe →'}
            </button>
          </form>
        </div>

        {/* ── MAIN COLUMNS ── */}
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand-col">
            <a href="#" className="footer-logo">
              <img src="/logo.png" alt="Inua360 Logo" className="h-10 w-auto" />
              <div className="footer-logo-text">
                <div className="footer-logo-sub" style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>AI Business Intelligence</div>
              </div>
            </a>
            <p className="footer-brand-desc">
              An AI-powered platform helping Kenya&apos;s SMEs understand their business health, stay compliant, and access the right funding opportunities — faster.
            </p>
            <div className="footer-socials">
              <a href="https://x.com/Inua360" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Twitter / X">
                <Twitter size={18} strokeWidth={2} />
              </a>
              <a href="https://www.linkedin.com/company/inua360" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="LinkedIn">
                <Linkedin size={18} strokeWidth={2} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61575479657497" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Facebook">
                <Facebook size={18} strokeWidth={2} />
              </a>
              <a href="https://www.instagram.com/inua360" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Instagram">
                <Instagram size={18} strokeWidth={2} />
              </a>
              <a href="mailto:hello.inua360@gmail.com" className="footer-social-btn" title="Email">
                <Mail size={18} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="footer-nav-col">
            <div className="footer-col-title">Product</div>
            <ul className="footer-nav-list">
              <li><a href="#">Business Health Report</a></li>
              <li><a href="#">Smart Alerts <span className="footer-nav-tag">LIVE</span></a></li>
              <li><a href="#">Funding Navigator</a></li>
              <li><a href="#">Compliance Tracker</a></li>
              <li><a href="#">Cash-Flow Forecaster</a></li>
              <li><a href="#">Profile Builder</a></li>
              <li><a href="#">AI Advisor <span className="footer-nav-tag">NEW</span></a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-nav-col">
            <div className="footer-col-title">Company</div>
            <ul className="footer-nav-list">
              <li><a href="#">About Inua360</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Partners &amp; Lenders</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press &amp; Media</a></li>
              <li><a href="#">Blog &amp; Insights</a></li>
              <li><a href="mailto:hello.inua360@gmail.com">Contact Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-nav-col">
            <div className="footer-col-title">Support</div>
            <ul className="footer-nav-list">
              <li><a href="#">Help Centre</a></li>
              <li><a href="#">Getting Started</a></li>
              <li><a href="#">API Documentation</a></li>
              <li><a href="#">System Status</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Community Forum</a></li>
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Inua360. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <div className="footer-legal-sep"></div>
            <a href="#">Terms of Service</a>
            <div className="footer-legal-sep"></div>
            <a href="#">Cookie Policy</a>
            <div className="footer-legal-sep"></div>
            <a href="#">Data Protection</a>
          </div>
          <div className="footer-made-in">
            <span className="footer-flag">🇰🇪</span> Built with purpose in Nairobi, Kenya
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
