import { useState, useEffect } from "react";
import "./AuthPage.css";

export default function SignUpPage({ navigate, setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("home"), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSignUp = () => {
    if (!name || !email || !password) return;
    setUser({ name, email });
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card auth-card--success">
          <div className="auth-success-icon">🎉</div>
          <h2>Account Created!</h2>
          <p className="auth-sub">Welcome to LearnSL, {name}! Redirecting you home…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="auth-back" onClick={() => navigate("home")}>← Back</button>
        <div className="auth-logo">🇱🇰 Learn<em>SL</em></div>
        <h2>Start Learning Today</h2>
        <p className="auth-sub">Join 50,000+ Sri Lankan learners</p>
        <div className="auth-form">
          <input
            type="text"
            placeholder="Full name"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email address"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-primary auth-submit" onClick={handleSignUp}>
            Create Account
          </button>
        </div>
        <p className="auth-switch">
          Already have an account?{" "}
          <button className="auth-link" onClick={() => navigate("signin")}>Sign In</button>
        </p>
      </div>
    </div>
  );
}