import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import './Auth.css';

const Register: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-header">
        <h1 className="auth-title">Coming Soon! 🚀</h1>
        <p className="auth-subtitle" style={{ fontSize: '17px' }}>
          Start your journey to becoming funding-ready today.<br />Join our waitlist for early access.
        </p>
      </div>

      <div className="auth-card">
        <div className="auth-tabs">
          <Link to="/login" className="auth-tab">Login</Link>
          <div className="auth-tab active">Register</div>
        </div>

        <form className="auth-form mt-4" action="https://formsubmit.co/hello.inua360@gmail.com" method="POST">
          <input type="hidden" name="_next" value="https://inua360.vercel.app/" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New Inua360 Waitlist Submission!" />

          <div>
            <label className="auth-field-label">Name</label>
            <div className="auth-input-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="auth-input"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="auth-field-label">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                className="auth-input"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="auth-field-label">I am a...</label>
            <select name="persona" className="block w-full rounded-xl border border-[var(--border-primary)] py-3 px-4 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 sm:text-sm bg-[var(--bg-secondary)] transition-colors appearance-none mt-1" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="SME">SME Founder / Owner</option>
                <option value="Lender">Bank / Financial Institution</option>
                <option value="Partner">Developer / Partner</option>
            </select>
          </div>

          <button type="submit" className="auth-submit-btn mt-8">
            Join Waitlist <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-terms mt-8">
          We care about your privacy. Your information is safe with us.
        </p>
      </div>
    </div>
  );
};

export default Register;