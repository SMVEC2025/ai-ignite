// RegisterPage.jsx
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Index() {
    const [step, setStep] = useState(1); // 1=email, 2=otp, 3=set-password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();

    async function sendOtp(e) {
        e.preventDefault();
        setMsg("");
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: true },
        });
        setLoading(false);
        if (error) {
            console.log(error.message)
            setMsg(error.message);
        }
        else {
            setMsg("We sent a 6-digit code to your email.");
            setStep(2);
        }
    }

    async function verifyOtp(e) {
        e.preventDefault();
        setMsg("");
        setLoading(true);
        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: "email",
        });
        setLoading(false);
        if (error) setMsg(error.message);
        else {
            setMsg("Email verified. Now set a password.");
            setStep(3);
        }
    }

    async function setPwd(e) {
        e.preventDefault();
        setMsg("");
        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        setLoading(false);
        if (error) setMsg(error.message);
        else {
            setMsg("Account ready. You are signed in.");
            nav("/");
        }
    }

    return (
        <main className="login-root">
            <div className="login-card">
                {/* Brand / Header */}
                <div className="login-brand">
                    <div className="login-logo" aria-hidden="true">
                        <span />
                    </div>
                    <h1 className="login-title">Create account</h1>
                    <p className="login-subtitle">
                        Sign up with email OTP and set your password
                    </p>
                </div>



                {/* Forms */}
                {step === 1 && (
                    <form className="login-form" onSubmit={sendOtp} noValidate>
                        <div className="login-field">
                            <label htmlFor="reg-email" className="login-label">
                                Email
                            </label>
                            <input
                                id="reg-email"
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

                        {msg && <div className="login-note">{msg}</div>}

                        <button type="submit" className="login-btn login-btn--primary" disabled={loading}>
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form className="login-form" onSubmit={verifyOtp} noValidate>
                        <div className="login-field">
                            <label htmlFor="reg-otp" className="login-label">
                                6-digit code
                            </label>
                            <input
                                id="reg-otp"
                                name="otp"
                                type="text"
                                inputMode="numeric"
                                className="login-input"
                                placeholder="Enter code"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>

                        {msg && <div className="login-note">{msg}</div>}

                        <button type="submit" className="login-btn login-btn--primary" disabled={loading}>
                            {loading ? "Verifying..." : "Verify"}
                        </button>

                        <div className="login-links">
                            <span
                                type="button"
                                className="login-link"
                                onClick={(e) => {
                                    // allow resending without leaving step
                                    sendOtp(e);
                                }}
                            >
                                Resend code
                            </span>
                            <span
                                type="button"
                                className="login-link"
                                onClick={() => setStep(1)}
                            >
                                Change email
                            </span>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form className="login-form" onSubmit={setPwd} noValidate>
                        <div className="login-field">
                            <label htmlFor="reg-password" className="login-label">
                                New password
                            </label>
                            <div className="login-inputWrap">
                                <input
                                    id="reg-password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="login-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="login-toggle"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {msg && <div className="login-note">{msg}</div>}

                        <button type="submit" className="login-btn login-btn--primary" disabled={loading}>
                            {loading ? "Setting..." : "Set password & Continue"}
                        </button>
                    </form>
                )}

                {/* Footer links (reuse same classes) */}
                <div className="login-links">
                    <Link to="/login" className="login-link">
                        Back to login
                    </Link>
                </div>
            </div>

            <footer className="login-footer">
                <p>© {new Date().getFullYear()} SMVEC</p>
            </footer>
        </main>
    );
}
