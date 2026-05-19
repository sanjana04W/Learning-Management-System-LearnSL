import { useState, useEffect } from "react";
import "./AuthPage.css";

export default function SignInPage({ navigate, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("home"), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSignIn = () => {
    if (!email || !password) return;
    setUser({ name: email.split("@")[0], email });
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card auth-card--success">
          <div className="auth-success-icon">✅</div>
          <h2>Welcome Back!</h2>
          <p className="auth-sub">Signed in successfully. Redirecting you home…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="auth-back" onClick={() => navigate("home")}>← Back</button>
        <div className="auth-logo">🇱🇰 Learn<em>SL</em></div>
        <h2>Welcome Back</h2>
        <p className="auth-sub">Sign in to continue learning</p>
        <div className="auth-form">
          <input
            type="email"
            placeholder="Email address"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-primary auth-submit" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
        <p className="auth-switch">
          Don't have an account?{" "}
          <button className="auth-link" onClick={() => navigate("signup")}>Get Started</button>
        </p>
      </div>
    </div>
  );
}