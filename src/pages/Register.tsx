import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { authAPI } from '../services/api';
import './Auth.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    try {
      await authAPI.register({
        username: email,
        email: email,
        password: password
      });

      await authAPI.login({ username: email, password });
      // localStorage.setItem('auth_token', response.data.access);
      // localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/onboarding');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMsg('Registration failed. Username might already be taken.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // console.log(credentialResponse);
    try {
      const response = await authAPI.googleLogin(credentialResponse.credential);

      // localStorage.setItem('auth_token', response.data.access);
      // localStorage.setItem('refresh_token', response.data.refresh);

      if (response.data.is_new_user) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      setErrorMsg('Failed to authenticate with Google.');
    }
  };

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