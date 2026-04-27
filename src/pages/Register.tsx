import React from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { useWaitlistSubmit } from '../hooks/useWaitlistSubmit';
import './Auth.css';

const Register: React.FC = () => {
  const { submit, status } = useWaitlistSubmit('register');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const personaVal = String(fd.get('persona') ?? '').trim();
    await submit({ name, email, persona: personaVal });
  };

  if (status === 'success') {
    return (
      <div className="auth-page">
        <div className="auth-header">
          <h1 className="auth-title">You&apos;re on the list</h1>
          <p className="auth-subtitle">
            We&apos;ll email you when Inua360 opens for early access.
          </p>
        </div>
        <div className="auth-card">
          <p className="auth-terms" style={{ textAlign: 'center' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>← Back to home</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-header">
        <h1 className="auth-title">Register for early access</h1>
        <p className="auth-subtitle" style={{ fontSize: '17px' }}>
          We&apos;re not onboarding full accounts yet — leave your details and we&apos;ll reach out when the platform is ready for you.
        </p>
      </div>

      <div className="auth-card">
        <div className="auth-tabs">
          <Link to="/login" className="auth-tab">Early access</Link>
          <div className="auth-tab active">Register interest</div>
        </div>

        <form className="auth-form mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="auth-field-label">Name</label>
            <div className="auth-input-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="auth-input"
                required
                disabled={status === 'loading'}
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
                disabled={status === 'loading'}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="auth-field-label">I am a...</label>
            <select
              name="persona"
              className="block w-full rounded-xl border border-[var(--border-primary)] py-3 px-4 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 sm:text-sm bg-[var(--bg-secondary)] transition-colors appearance-none mt-1"
              required
              defaultValue=""
              disabled={status === 'loading'}
            >
                <option value="" disabled>Select one</option>
                <option value="SME">SME Founder / Owner</option>
                <option value="Lender">Bank / Financial Institution</option>
                <option value="Partner">Developer / Partner</option>
            </select>
          </div>

          <button type="submit" className="auth-submit-btn mt-8" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : <>Join Waitlist <ArrowRight size={18} /></>}
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
