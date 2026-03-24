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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
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
      alert('Registration failed. Username might already be taken.');
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
      alert('Failed to authenticate with Google.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <p className="auth-subtitle" style={{ fontSize: '17px' }}>
          Start your journey to becoming funding-ready today
        </p>
      </div>

      <div className="auth-card">
        <div className="auth-tabs">
          <Link to="/login" className="auth-tab">Login</Link>
          <div className="auth-tab active">Register</div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label className="auth-field-label">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                type="email"
                placeholder="name@company.com"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="auth-field-label">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-input-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="auth-field-label" style={{ color: 'var(--auth-orange)' }}>
              Confirm Password
            </label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                className="auth-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-input-toggle"
                onClick={() => setShowConfirm(!showConfirm)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-divider">
          <div className="auth-divider-line" />
          <span className="auth-divider-text">or continue with</span>
          <div className="auth-divider-line" />
        </div>

        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.error('Google Login Failed');
            }}
            useOneTap
          />
        </div>

        <p className="auth-terms mt-6">
          By continuing, you agree to our{' '}
          <a href="#">Terms of Service</a> and{' '}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;