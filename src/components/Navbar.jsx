import "./Navbar.css";

export default function Navbar({ page, navigate, user, setUser }) {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <button className="navbar__logo" onClick={() => navigate("home")}>
          <span className="navbar__logo-icon">🇱🇰</span>
          <span className="navbar__logo-text">Learn<em>SL</em></span>
        </button>
        <div className="navbar__links">
          <button className={`navbar__link ${page === "home" ? "active" : ""}`} onClick={() => navigate("home")}>Home</button>
          <button className={`navbar__link ${page === "courses" ? "active" : ""}`} onClick={() => navigate("courses", { category: "all" })}>Courses</button>
          <button className={`navbar__link ${page === "instructors" ? "active" : ""}`} onClick={() => navigate("instructors")}>Instructors</button>
          <button className="navbar__link" onClick={() => navigate("courses", { category: "ol" })}>O/L</button>
          <button className="navbar__link" onClick={() => navigate("courses", { category: "al" })}>A/L</button>
        </div>
        <div className="navbar__actions">
          {user ? (
            <div className="navbar__profile">
              <button className="navbar__profile-btn" onClick={() => navigate("profile")}>
                <div className="navbar__avatar">{user.name.charAt(0).toUpperCase()}</div>
                <span className="navbar__username">{user.name}</span>
              </button>
              <button className="btn-ghost" onClick={() => setUser(null)}>Sign Out</button>
            </div>
          ) : (
            <>
              <button className="btn-ghost" onClick={() => navigate("signin")}>Sign In</button>
              <button className="btn-primary" style={{ padding: "10px 22px", fontSize: "14px" }} onClick={() => navigate("signup")}>Get Started</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
