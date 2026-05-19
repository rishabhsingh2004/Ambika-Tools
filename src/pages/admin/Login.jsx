import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './utils/auth';
import { signInWithGoogle } from '../../lib/supabase';
import { Wrench, Eye, EyeOff, Lock, User } from 'lucide-react';
import './Login.css';

// Google icon SVG
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
    <path d="M6.306 14.691l6.571 4.819C14.655 15.108 19.000 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
    <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.316 0-9.828-3.624-11.449-8.59l-6.501 5.012C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
    <path d="M43.611 20.083H42V20H24v8h11.303C34.477 30.396 32.498 32.5 30.001 33.837l.001-.001 6.19 5.238C41.38 35.566 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
  </svg>
);

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = login(form.username, form.password);
      if (ok) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    }, 600);
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const { error: err } = await signInWithGoogle();
      if (err) {
        setError(err.message === 'Supabase not configured'
          ? 'Google login not set up yet. Use username/password.'
          : err.message);
        setGoogleLoading(false);
      }
      // On success, Supabase redirects automatically
    } catch (e) {
      setError('Google login failed. Try username/password.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
      </div>
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-icon"><Wrench size={26} /></div>
          <h1 className="login-brand-name">Ambika Tools</h1>
          <p className="login-brand-sub">Admin Panel</p>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          className="login-google-btn"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
        >
          {googleLoading ? <span className="login-spinner" /> : <GoogleIcon />}
          {googleLoading ? 'Redirecting...' : 'Continue with Google'}
        </button>

        <div className="login-divider">
          <span>or sign in with credentials</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">Username</label>
            <div className="login-input-wrap">
              <User size={16} className="login-input-icon" />
              <input
                id="admin-username"
                type="text"
                className="login-input"
                placeholder="admin"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-input-wrap">
              <Lock size={16} className="login-input-icon" />
              <input
                id="admin-password"
                type={showPw ? 'text' : 'password'}
                className="login-input"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                autoComplete="current-password"
                required
              />
              <button type="button" className="login-eye" onClick={() => setShowPw(v => !v)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button id="admin-login-btn" type="submit" className="login-submit" disabled={loading || googleLoading}>
            {loading ? <span className="login-spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="login-hint">Default: admin / admin123</p>
      </div>
    </div>
  );
}
