import { useState } from "react";
import "./ProfilePage.css";

/* ── Sample enrolled courses (replace with real data/props as needed) ── */
const SAMPLE_COURSES = [
  { id: 1, title: "O/L Mathematics – Complete Guide", category: "O/L", progress: 72, emoji: "📐" },
  { id: 2, title: "Python Programming in Sinhala",   category: "IT",  progress: 45, emoji: "🐍" },
  { id: 3, title: "A/L Combined Mathematics",        category: "A/L", progress: 18, emoji: "∑"  },
];

const SAMPLE_CERTS = [
  { id: 1, title: "English Communication – Beginner", date: "March 2025" },
  { id: 2, title: "Web Design Fundamentals",          date: "January 2025" },
];

const SAMPLE_ACTIVITY = [
  { text: "Completed lesson 14 in O/L Mathematics",        time: "2h ago"    },
  { text: "Earned certificate in English Communication",    time: "Yesterday" },
  { text: "Started A/L Combined Mathematics",              time: "3 days ago" },
  { text: "Left a review on Python Programming in Sinhala", time: "1 week ago" },
];

const SAMPLE_QUIZ_RESULTS = [
  { id: 1, course: "O/L Mathematics – Complete Guide", score: 5, total: 6, date: "May 2026", passed: true },
  { id: 2, course: "Python Programming in Sinhala", score: 4, total: 6, date: "April 2026", passed: true },
  { id: 3, course: "A/L Combined Mathematics", score: 3, total: 6, date: "March 2026", passed: false },
];

export default function ProfilePage({ navigate, user, setUser }) {
  /* ── Editable personal info ── */
  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState({
    name:    user?.name    || "",
    email:   user?.email   || "",
    phone:   user?.phone   || "",
    address: user?.address || "",
    city:    user?.city    || "",
    district:user?.district|| "",
    dob:     user?.dob     || "",
    bio:     user?.bio     || "",
  });
  const [draft, setDraft] = useState({ ...info });

  const handleSave = () => {
    setInfo({ ...draft });
    setUser((prev) => ({ ...prev, ...draft }));
    setEditing(false);
  };

  const printWindowContent = (title, bodyHtml) => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 32px; color: #111; }
            h1 { font-size: 28px; margin-bottom: 12px; }
            p, div { font-size: 14px; line-height: 1.6; margin: 6px 0; }
            .section { margin-top: 20px; }
            .section-title { font-weight: 700; margin-bottom: 10px; }
            .row { margin-bottom: 8px; }
            .label { font-weight: 700; }
            .cert-box { border: 1px solid #ccc; padding: 18px; border-radius: 12px; margin-top: 12px; }
          </style>
        </head>
        <body>
          ${bodyHtml}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleDownloadProfilePDF = () => {
    const profileHtml = `
      <h1>${info.name || "Learner Profile"}</h1>
      <div class="section">
        <div class="section-title">Personal Information</div>
        <div class="row"><span class="label">Email:</span> ${info.email || "Not provided"}</div>
        <div class="row"><span class="label">Phone:</span> ${info.phone || "Not provided"}</div>
        <div class="row"><span class="label">Date of Birth:</span> ${info.dob || "Not provided"}</div>
        <div class="row"><span class="label">Address:</span> ${info.address || "Not provided"}</div>
        <div class="row"><span class="label">City:</span> ${info.city || "Not provided"}</div>
        <div class="row"><span class="label">District:</span> ${info.district || "Not provided"}</div>
      </div>
      <div class="section">
        <div class="section-title">About Me</div>
        <div class="row">${info.bio || "No bio available."}</div>
      </div>
      <div class="section">
        <div class="section-title">Courses Enrolled</div>
        ${SAMPLE_COURSES.map((course) => `
          <div class="row"><span class="label">${course.title}:</span> ${course.progress}% complete</div>
        `).join("")}
      </div>
      <div class="section">
        <div class="section-title">Certificates</div>
        ${SAMPLE_CERTS.map((cert) => `
          <div class="cert-box">
            <div class="row"><span class="label">${cert.title}</span></div>
            <div class="row">Earned: ${cert.date}</div>
          </div>
        `).join("")}
      </div>
    `;

    printWindowContent(`${info.name || "Profile"} PDF`, profileHtml);
  };

  const handleDownloadCertificatePDF = (cert) => {
    const certHtml = `
      <h1>${cert.title}</h1>
      <div class="section">
        <div class="row"><span class="label">Awarded to:</span> ${info.name || "Learner"}</div>
        <div class="row"><span class="label">Date:</span> ${cert.date}</div>
        <div class="row" style="margin-top:20px;">Congratulations on this achievement!</div>
      </div>
    `;

    printWindowContent(`${cert.title} Certificate`, certHtml);
  };

  const field = (label, key, type = "text", placeholder = "Not set") => (
    <div className="info-field" key={key}>
      <div className="info-field__label">{label}</div>
      {editing ? (
        <input
          className="info-field__input"
          type={type}
          value={draft[key]}
          placeholder={placeholder}
          onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
        />
      ) : (
        <div className={`info-field__value${!info[key] ? " info-field__value--placeholder" : ""}`}>
          {info[key] || placeholder}
        </div>
      )}
    </div>
  );

  const initials = info.name ? info.name.charAt(0).toUpperCase() : "?";
  const completedCount = SAMPLE_CERTS.length;
  const quizResults = user?.quizResults || SAMPLE_QUIZ_RESULTS;
  const quizPassedCount = quizResults.filter((result) => result.passed).length;
  const avgProgress = Math.round(
    SAMPLE_COURSES.reduce((s, c) => s + c.progress, 0) / (SAMPLE_COURSES.length || 1)
  );

  return (
    <div className="profile-page">

      {/* ── Banner ── */}
      <div className="profile-header">
        <div className="profile-header__pattern" />
        <div className="container profile-header__inner">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-lg">{initials}</div>
            <div className="profile-avatar-badge" />
          </div>
          <div className="profile-header__info">
            <div className="profile-header__name">
              {info.name || "Your Name"}
            </div>
            <div className="profile-header__email">{info.email}</div>
            <div className="profile-header__tags">
              <span className="profile-tag">🇱🇰 Sri Lanka</span>
              {info.district && <span className="profile-tag">📍 {info.district}</span>}
              <span className="profile-tag">🎓 {SAMPLE_COURSES.length} Courses</span>
              <span className="profile-tag">📜 {completedCount} Certificates</span>
              <span className="profile-tag">🧠 {quizPassedCount} Passed Quizzes</span>
            </div>
            <button className="profile-download-btn" onClick={handleDownloadProfilePDF}>
              ⬇ Download Profile PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="container">
        <div className="profile-stats-bar">
          {[
            { icon: "📚", val: SAMPLE_COURSES.length, label: "Courses Enrolled" },
            { icon: "📜", val: completedCount,         label: "Certificates"     },
            { icon: "📈", val: `${avgProgress}%`,      label: "Avg Progress"     },
            { icon: "🔥", val: "14",                   label: "Day Streak"       },
          ].map((s) => (
            <div key={s.label} className="profile-stat-item">
              <div className="profile-stat-item__icon">{s.icon}</div>
              <div className="profile-stat-item__val">{s.val}</div>
              <div className="profile-stat-item__label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Body Grid ── */}
        <div className="profile-body">

          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Personal Details */}
            <div className="profile-card">
              <div className="profile-card__head">
                <div className="profile-card__title">
                  <span className="profile-card__title-icon">👤</span> Personal Details
                </div>
                {editing ? (
                  <button className="profile-card__edit" onClick={handleSave}>Save ✓</button>
                ) : (
                  <button className="profile-card__edit" onClick={() => { setDraft({ ...info }); setEditing(true); }}>Edit</button>
                )}
              </div>
              <div className="profile-card__body">
                {field("Full Name",   "name",    "text",  "Enter your name")}
                {field("Email",       "email",   "email", "Enter your email")}
                {field("Phone",       "phone",   "tel",   "+94 XX XXX XXXX")}
                {field("Date of Birth","dob",    "date",  "")}
              </div>
            </div>

            {/* Address */}
            <div className="profile-card">
              <div className="profile-card__head">
                <div className="profile-card__title">
                  <span className="profile-card__title-icon">📍</span> Address
                </div>
                {editing ? (
                  <button className="profile-card__edit" onClick={handleSave}>Save ✓</button>
                ) : (
                  <button className="profile-card__edit" onClick={() => { setDraft({ ...info }); setEditing(true); }}>Edit</button>
                )}
              </div>
              <div className="profile-card__body">
                {field("Street Address", "address",  "text", "No. 12, Galle Road…")}
                {field("City",           "city",     "text", "Colombo")}
                {field("District",       "district", "text", "Colombo District")}
              </div>
            </div>

            {/* Bio */}
            <div className="profile-card">
              <div className="profile-card__head">
                <div className="profile-card__title">
                  <span className="profile-card__title-icon">✍️</span> About Me
                </div>
                {editing ? (
                  <button className="profile-card__edit" onClick={handleSave}>Save ✓</button>
                ) : (
                  <button className="profile-card__edit" onClick={() => { setDraft({ ...info }); setEditing(true); }}>Edit</button>
                )}
              </div>
              <div className="profile-card__body">
                {editing ? (
                  <textarea
                    className="info-field__input"
                    rows={4}
                    placeholder="Write a short bio…"
                    value={draft.bio}
                    onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                    style={{ resize: "vertical" }}
                  />
                ) : (
                  <p className={`profile-bio${!info.bio ? " info-field__value--placeholder" : ""}`}>
                    {info.bio || "No bio added yet. Tell us a little about yourself!"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Courses */}
            <div className="profile-card">
              <div className="profile-card__head">
                <div className="profile-card__title">
                  <span className="profile-card__title-icon">🎓</span> My Courses
                </div>
                <button className="profile-card__edit" onClick={() => navigate("courses", { category: "all" })}>
                  Browse More
                </button>
              </div>
              <div className="profile-card__body">
                {SAMPLE_COURSES.length === 0 ? (
                  <div className="profile-empty">
                    <div className="profile-empty__icon">📚</div>
                    You haven't enrolled in any courses yet.
                  </div>
                ) : (
                  SAMPLE_COURSES.map((c) => (
                    <div key={c.id} className="enrolled-course">
                      <div className="enrolled-course__thumb">{c.emoji}</div>
                      <div className="enrolled-course__info">
                        <div className="enrolled-course__title">{c.title}</div>
                        <div className="enrolled-course__meta">{c.category}</div>
                        <div className="progress-bar">
                          <div className="progress-bar__fill" style={{ width: `${c.progress}%` }} />
                        </div>
                      </div>
                      <div className="enrolled-course__pct">{c.progress}%</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quiz Results */}
            <div className="profile-card">
              <div className="profile-card__head">
                <div className="profile-card__title">
                  <span className="profile-card__title-icon">🧠</span> Quiz Results
                </div>
              </div>
              <div className="profile-card__body">
                {quizResults.length === 0 ? (
                  <div className="profile-empty">
                    <div className="profile-empty__icon">📊</div>
                    No quiz results yet. Complete a quiz to see your performance.
                  </div>
                ) : (
                  quizResults.map((result) => (
                    <div key={result.id} className="quiz-result-item">
                      <div className="quiz-result-item__meta">
                        <div className="quiz-result-item__title">{result.course}</div>
                        <div className="quiz-result-item__date">{result.date}</div>
                      </div>
                      <div className="quiz-result-item__status">
                        <span className={`quiz-result-pill ${result.passed ? "pass" : "fail"}`}>
                          {result.passed ? "Passed" : "Review"}
                        </span>
                        <span className="quiz-result-score">
                          {result.score}/{result.total}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Certificates */}
            <div className="profile-card">
              <div className="profile-card__head">
                <div className="profile-card__title">
                  <span className="profile-card__title-icon">📜</span> Certificates
                </div>
              </div>
              <div className="profile-card__body">
                {SAMPLE_CERTS.length === 0 ? (
                  <div className="profile-empty">
                    <div className="profile-empty__icon">🏆</div>
                    Complete a course to earn your first certificate.
                  </div>
                ) : (
                  SAMPLE_CERTS.map((cert) => (
                    <div key={cert.id} className="cert-item">
                      <div className="cert-icon">🏅</div>
                      <div className="cert-item__info">
                        <div className="cert-item__title">{cert.title}</div>
                        <div className="cert-item__date">Earned {cert.date}</div>
                      </div>
                      <button
                        className="cert-download"
                        onClick={() => handleDownloadCertificatePDF(cert)}
                      >
                        ⬇ PDF
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="profile-card">
              <div className="profile-card__head">
                <div className="profile-card__title">
                  <span className="profile-card__title-icon">⚡</span> Recent Activity
                </div>
              </div>
              <div className="profile-card__body">
                {SAMPLE_ACTIVITY.map((a, i) => (
                  <div key={i} className="activity-row">
                    <div className="activity-dot" />
                    <div className="activity-row__text">{a.text}</div>
                    <div className="activity-row__time">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Sign Out */}
        <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
          <button
            className="btn-ghost"
            onClick={() => { setUser(null); navigate("home"); }}
            style={{ color: "#ef4444", borderColor: "#fecaca" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
