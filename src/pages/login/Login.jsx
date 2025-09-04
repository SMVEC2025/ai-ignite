import { useState } from "react";
import { supabase } from '../../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate=useNavigate();

    const onChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };
    async function login(e) {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword(form);
        if (error) setErrors({ message: error.message });
        else navigate('/');
    }
    async function oauth(provider) {
        await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: window.location.origin }
        });
    }

    const validate = () => {
        const next = {};
        if (!form.email) next.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
        if (!form.password) next.password = "Password is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };


    const onSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        // TODO: replace with your auth call
        login(e)
    };

    return (
        <main className="login-root">
            <div className="login-card">
                <div className="login-brand">
                    <div className="login-logo" aria-hidden="true">
                        {/* Minimal logo dot */}
                        <span />
                    </div>
                    <h1 className="login-title">Welcome back</h1>
                    <p className="login-subtitle">Sign in to continue</p>
                </div>

                <form className="login-form" onSubmit={onSubmit} noValidate>
                    <div className="login-field">
                        <label htmlFor="email" className="login-label">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`login-input ${errors.email ? "is-invalid" : ""}`}
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={onChange}
                            autoComplete="email"
                            required
                        />
                        {errors.email && <div className="login-error">{errors.email}</div>}
                    </div>

                    <div className="login-field">
                        <label htmlFor="password" className="login-label">Password</label>
                        <div className="login-inputWrap">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className={`login-input ${errors.password ? "is-invalid" : ""}`}
                                placeholder="••••••••"
                                value={form.password}
                                onChange={onChange}
                                autoComplete="current-password"
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
                        {errors.password && <div className="login-error">{errors.password}</div>}
                    </div>
                    {errors.message && <div className="login-error">{errors.message}</div>}
                    <button type="submit" className="login-btn login-btn--primary">
                        Sign in
                    </button>
                </form>

                <div className="login-divider" role="separator">
                    <span>or</span>
                </div>

                <div className="login-providers">
                    <button className="login-btn login-btn--provider" onClick={() => oauth('google')}>
                        <svg className="login-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M21.35 11.1H12v2.9h5.3c-.23 1.48-1.8 4.34-5.3 4.34a5.65 5.65 0 1 1 0-11.3 5.15 5.15 0 0 1 3.64 1.42l1.99-2A8.4 8.4 0 0 0 12 4.1a8.9 8.9 0 1 0 0 17.8c5.15 0 8.55-3.62 8.55-8.73 0-.59-.07-1.05-.2-1.57Z" />
                        </svg>
                        Continue with Google
                    </button>
                    <button className="login-btn login-btn--provider" onClick={() => oauth('github')}>
                        <svg className="login-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 .5A11.5 11.5 0 0 0 .5 12.4c0 5.25 3.38 9.7 8.06 11.28.6.12.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.28.73-3.98-1.6-3.98-1.6-.54-1.4-1.33-1.77-1.33-1.77-1.08-.77.08-.76.08-.76 1.2.09 1.83 1.27 1.83 1.27 1.07 1.89 2.8 1.34 3.48 1.02.11-.8.42-1.34.76-1.65-2.62-.3-5.38-1.37-5.38-6.12 0-1.35.47-2.45 1.24-3.31-.12-.3-.54-1.53.12-3.17 0 0 1.02-.33 3.34 1.26A11.6 11.6 0 0 1 12 6.9c1.03 0 2.06.14 3.02.41 2.31-1.59 3.33-1.26 3.33-1.26.66 1.64.25 2.87.13 3.17.77.86 1.23 1.96 1.23 3.31 0 4.77-2.77 5.81-5.41 6.11.43.38.81 1.12.81 2.27 0 1.64-.02 2.96-.02 3.36 0 .32.21.71.83.58 4.67-1.56 8.05-6.03 8.05-11.28A11.5 11.5 0 0 0 12 .5Z" />
                        </svg>
                        Continue with GitHub
                    </button>
                </div>

                <div className="login-links">
                    <a href="/sign-up" className="login-link">Create account?</a>
                    <a href="/forgot-password" className="login-link">Forgot password?</a>
                </div>
            </div>

            <footer className="login-footer">
                <p>© {new Date().getFullYear()} SMVEC</p>
            </footer>
        </main>
    );
}
