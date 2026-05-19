import "./Footer.css";

export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">🇱🇰 Learn<em>SL</em></div>
          <p>Sri Lanka's trusted online learning platform. Quality education in Sinhala, Tamil & English.</p>
          <div className="footer__langs">
            <span>සිංහල</span><span>தமிழ்</span><span>English</span>
          </div>
        </div>
        <div className="footer__col">
          <h4>Categories</h4>
          <button onClick={() => navigate("courses", { category: "ol" })}>O/L Preparation</button>
          <button onClick={() => navigate("courses", { category: "al" })}>A/L Preparation</button>
          <button onClick={() => navigate("courses", { category: "it" })}>IT & Technology</button>
          <button onClick={() => navigate("courses", { category: "vocational" })}>Vocational Skills</button>
        </div>
        <div className="footer__col">
          <h4>LearnSL</h4>
          <button>About Us</button>
          <button>Become an Instructor</button>
          <button>Blog</button>
          <button>Contact</button>
        </div>
        <div className="footer__col">
          <h4>Support</h4>
          <button>Help Centre</button>
          <button>Privacy Policy</button>
          <button>Terms of Use</button>
          <button>Refund Policy</button>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© 2025 LearnSL (Pvt) Ltd. All rights reserved. Registered in Sri Lanka.</p>
        </div>
      </div>
    </footer>
  );
}
