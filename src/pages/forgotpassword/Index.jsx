// ForgotPassword.jsx
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendReset(e) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) setErr(error.message);
    else setMsg("Check your email for a reset link.");
  }

  return (
    <main className="login-root">
      <div className="login-card">
        {/* Brand / header */}
        <div className="login-brand">
          <div className="login-logo" aria-hidden="true">
            <span />
          </div>
          <h1 className="login-title">Reset your password</h1>
          <p className="login-subtitle">Enter your email to receive a reset link</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={sendReset} noValidate>
          <div className="login-field">
            <label htmlFor="fp-email" className="login-label">Email</label>
            <input
              id="fp-email"
              name="email"
              type="email"
              className="login-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          {err && <div className="login-error">{err}</div>}
          {msg && <div className="login-note">{msg}</div>}

          <button type="submit" className="login-btn login-btn--primary" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {/* Links */}
        <div className="login-links">
          <Link to="/login" className="login-link">Back to login</Link>
          <Link to="/sign-up" className="login-link">Create account</Link>
        </div>
      </div>

      <footer className="login-footer">
        <p>© {new Date().getFullYear()} SMVEC</p>
      </footer>
    </main>
  );
}
