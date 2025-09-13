// src/pages/ResetPasswordOtp.jsx
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function ResetPasswordOtp() {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);
  const nav = useNavigate();

  const isEmail = (v) => /\S+@\S+\.\S+/.test(v);

  useEffect(() => {
    if (cooldown <= 0) return;
    timerRef.current = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [cooldown]);

  async function sendOtp(e) {
    e.preventDefault();
    setMsg('');
    if (!isEmail(email)) { setMsg('Please enter a valid email address.'); return; }
    if (cooldown > 0 || loading) return;

    setLoading(true);
    try {
      // Only for existing users
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false }
      });

      if (error) {
        const t = String(error.message || '').toLowerCase();
        if (t.includes('not found') || t.includes('no user') || t.includes('signup')) {
          setMsg('No account found for this email. Please sign up.');
        } else if (t.includes('rate limit') || t.includes('too many')) {
          setMsg('Please wait a moment before requesting another code.');
          setCooldown(30);
        } else {
          setMsg(error.message);
        }
        return;
      }

      setMsg('We sent a 6-digit code to your email.');
      setStep(2);
      setCooldown(60);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e) {
    e.preventDefault();
    setMsg('');
    if (!/^\d{6}$/.test(code)) { setMsg('Enter the 6-digit code.'); return; }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email',
      });
      if (error) {
        const t = String(error.message || '').toLowerCase();
        if (t.includes('invalid') || t.includes('expired')) {
          setMsg('Invalid or expired code. Please try again.');
        } else {
          setMsg(error.message);
        }
        return;
      }
      if (data?.session) {
        setMsg('Code verified. Choose a new password.');
        setStep(3);
      } else {
        setMsg('Verified, but no session established. Try requesting a new code.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function setNewPassword(e) {
    e.preventDefault();
    setMsg('');
    if (!password || password.length < 8) {
      setMsg('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) { setMsg(error.message); return; }
      setMsg('Password updated. You are signed in.');
      nav('/', { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-root">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo" aria-hidden="true"><span /></div>
          <h1 className="login-title">Reset your password</h1>
          <p className="login-subtitle">Use the OTP sent to your email</p>
        </div>

        {/* STEP 1: Email */}
        {step === 1 && (
          <form className="login-form" onSubmit={sendOtp} noValidate>
            <div className="login-field">
              <label htmlFor="email" className="login-label">Email</label>
              <input
                id="email"
                type="email"
                className="login-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {msg && <div className="login-error" role="alert">{msg}</div>}

            <button
              type="submit"
              className="login-btn login-btn--primary"
              disabled={loading || cooldown > 0}
            >
              {loading ? 'Sending…' : (cooldown > 0 ? `Resend in ${cooldown}s` : 'Send code')}
            </button>

            <div className="login-links">
              <Link to="/login" className="login-link">Back to sign in</Link>
              <Link to="/sign-up" className="login-link">Create account</Link>
            </div>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <form className="login-form" onSubmit={verifyOtp} noValidate>
            <div className="login-field">
              <label htmlFor="otp" className="login-label">
                Enter OTP
              </label>
              <input
                id="otp"
                className="login-input"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e)=>setCode(e.target.value.replace(/\D/g,'').slice(0,6))}
              />
            </div>

            {msg && <div className="login-error" role="alert">{msg}</div>}

            <div className="login-providers" style={{gap:8}}>
              <button type="submit" className="login-btn login-btn--primary" disabled={loading}>
                {loading ? 'Verifying…' : 'Verify code'}
              </button>
              <button
                type="button"
                className="login-btn"
                onClick={sendOtp}
                disabled={loading || cooldown > 0}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
              </button>
              <button type="button" className="login-btn login-btn--ghost" onClick={()=>setStep(1)}>
                Change email
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: New password */}
        {step === 3 && (
          <form className="login-form" onSubmit={setNewPassword} noValidate>
            <div className="login-field">
              <label htmlFor="password" className="login-label">New password</label>
              <input
                id="password"
                type="password"
                className="login-input"
                placeholder="Min 8 characters"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            {msg && <div className="login-error" role="alert">{msg}</div>}

            <button type="submit" className="login-btn login-btn--primary" disabled={loading}>
              {loading ? 'Updating…' : 'Update password'}
            </button>

            <div className="login-links">
              <Link to="/login" className="login-link">Back to sign in</Link>
            </div>
          </form>
        )}
      </div>

      <footer className="login-footer">
        <p>© {new Date().getFullYear()} AIIGNITE</p>
      </footer>
    </main>
  );
}
