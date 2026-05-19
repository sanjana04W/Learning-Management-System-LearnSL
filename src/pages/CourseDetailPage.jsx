import { useState } from "react";
import { courses } from "../data/courses";
import CourseCard from "../components/CourseCard";
import { courseQuizzes } from "../data/courseQuizzes";
import "./CourseDetailPage.css";


// ─── Quiz sub-component ────────────────────────────────────────────────────
function CourseQuiz({ quiz }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);   // index chosen this question
  const [confirmed, setConfirmed] = useState(false); // answer locked in
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const q = quiz[current];
  const total = quiz.length;

  function handleOption(idx) {
    if (confirmed) return;
    setSelected(idx);
  }

  function handleConfirm() {
    if (selected === null || confirmed) return;
    setConfirmed(true);
    if (selected === q.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
  }

  // ── Finished screen ──
  if (finished) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;
    return (
      <div className="quiz-result">
        <div className={`quiz-result__badge ${passed ? "pass" : "fail"}`}>
          {passed ? "🎉" : "📚"}
        </div>
        <h3 className="quiz-result__title">
          {passed ? "Well done!" : "Keep practising!"}
        </h3>
        <p className="quiz-result__score">
          You scored <strong>{score}/{total}</strong> ({pct}%)
        </p>
        <p className="quiz-result__sub">
          {passed
            ? "You've demonstrated a solid understanding of this course material."
            : "Review the course content and try the quiz again to improve your score."}
        </p>
        {passed && (
          <div className="quiz-result__cert">
            🏅 You've earned a completion badge for this quiz!
          </div>
        )}
        <button className="btn-primary quiz-result__btn" onClick={handleRestart}>
          Retake Quiz
        </button>
      </div>
    );
  }

  // ── Question screen ──
  return (
    <div className="quiz-wrap">
      {/* Progress bar */}
      <div className="quiz-progress">
        <div
          className="quiz-progress__bar"
          style={{ width: `${((current) / total) * 100}%` }}
        />
      </div>

      <div className="quiz-header">
        <span className="quiz-counter">Question {current + 1} of {total}</span>
        <span className="quiz-score-live">Score: {score}</span>
      </div>

      <p className="quiz-question">{q.question}</p>

      <div className="quiz-options">
        {q.options.map((opt, idx) => {
          let cls = "quiz-option";
          if (confirmed) {
            if (idx === q.correctIndex) cls += " correct";
            else if (idx === selected && selected !== q.correctIndex) cls += " wrong";
          } else if (idx === selected) {
            cls += " selected";
          }
          return (
            <button key={idx} className={cls} onClick={() => handleOption(idx)}>
              <span className="quiz-option__letter">
                {["A", "B", "C", "D"][idx]}
              </span>
              <span>{opt}</span>
              {confirmed && idx === q.correctIndex && (
                <span className="quiz-option__tick">✓</span>
              )}
              {confirmed && idx === selected && selected !== q.correctIndex && (
                <span className="quiz-option__tick">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {confirmed && (
        <div className={`quiz-feedback ${selected === q.correctIndex ? "correct" : "wrong"}`}>
          {selected === q.correctIndex
            ? "✅ Correct! Great work."
            : `❌ Not quite. The correct answer is "${q.options[q.correctIndex]}".`}
        </div>
      )}

      <div className="quiz-actions">
        {!confirmed ? (
          <button
            className="btn-primary"
            disabled={selected === null}
            onClick={handleConfirm}
          >
            Confirm Answer
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNext}>
            {current + 1 >= total ? "See Results" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function CourseDetailPage({ courseId, navigate }) {
  const course = courses.find((c) => c.id === courseId) || courses[0];
  // attach quiz data from courseQuizzes if available
  course.quiz = courseQuizzes[course.id] || course.quiz || [];
  const related = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 3);

  const [openSection, setOpenSection] = useState(0);
  const [enrolled, setEnrolled] = useState(false);

  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <div className="detail-breadcrumb">
        <div className="container detail-breadcrumb__inner">
          <button onClick={() => navigate("home")}>Home</button>
          <span>›</span>
          <button onClick={() => navigate("courses", { category: course.category })}>
            {course.category.toUpperCase()}
          </button>
          <span>›</span>
          <span>{course.title}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="detail-hero">
        <div className="container detail-hero__inner">
          <div className="detail-hero__content">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              <span className="badge badge-lang">{course.language}</span>
              <span className="badge badge-level">{course.level}</span>
              <span className="badge badge-category">{course.tags[0]}</span>
            </div>
            <h1 className="detail-hero__title">{course.title}</h1>
            <p className="detail-hero__sub">{course.subtitle}</p>
            <div className="detail-hero__meta">
              <span className="detail-hero__rating">
                <span className="stars">★★★★★</span>
                {course.rating} ({course.reviews.toLocaleString()} reviews)
              </span>
              <span>·</span>
              <span>{course.students.toLocaleString()} students</span>
              <span>·</span>
              <span>{course.duration}</span>
            </div>
            <div className="detail-hero__instructor">
              <div className="avatar">{course.instructorAvatar}</div>
              <div>
                <span className="detail-hero__instructor-label">Created by</span>
                <strong>{course.instructor}</strong>
              </div>
            </div>
          </div>

          {/* Sticky enroll card */}
          <div className="enroll-card">
            <img src={course.image} alt={course.title} className="enroll-card__img" />
            <div className="enroll-card__body">
              <div className="enroll-card__price">
                <span className="enroll-card__main-price">LKR {course.price.toLocaleString()}</span>
                <span className="enroll-card__orig-price">LKR {course.originalPrice.toLocaleString()}</span>
                <span className="enroll-card__discount">
                  {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                </span>
              </div>
              <button
                className={`btn-primary ${enrolled ? "enrolled" : ""}`}
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setEnrolled(true)}
              >
                {enrolled ? "✓ Enrolled!" : "Enrol Now"}
              </button>
              <button
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              >
                Try Free Preview
              </button>
              <div className="enroll-card__info">
                {[
                  ["📚", `${course.lessons} lessons`],
                  ["⏱️", course.duration],
                  ["📶", course.level],
                  ["🌐", course.language],
                  ["📜", "Certificate included"],
                  ["♾️", "Lifetime access"],
                ].map(([icon, text]) => (
                  <div key={text} className="enroll-card__info-row">
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container detail-body">
        <div className="detail-main">
          {/* Description */}
          <section className="detail-section">
            <h2>About This Course</h2>
            <p className="detail-desc">{course.description}</p>
            <div className="detail-tags">
              {course.tags.map((tag) => (
                <span key={tag} className="badge badge-category">{tag}</span>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section className="detail-section">
            <h2>Course Curriculum</h2>
            <div className="curriculum-summary">
              {course.curriculum.reduce((acc, s) => acc + s.lessons.length, 0)} lessons ·{" "}
              {course.duration}
            </div>
            <div className="accordion">
              {course.curriculum.map((section, i) => (
                <div
                  key={section.section}
                  className={`accordion__item ${openSection === i ? "open" : ""}`}
                >
                  <button
                    className="accordion__header"
                    onClick={() => setOpenSection(openSection === i ? -1 : i)}
                  >
                    <span>
                      <strong>{section.section}</strong>
                      <em>{section.lessons.length} lessons</em>
                    </span>
                    <span className="accordion__chevron">{openSection === i ? "▲" : "▼"}</span>
                  </button>
                  {openSection === i && (
                    <div className="accordion__body">
                      {section.lessons.map((lesson, j) => (
                        <div key={lesson} className="accordion__lesson">
                          <span className="accordion__lesson-num">{j + 1}</span>
                          <span>▶</span>
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Quiz ───────────────────────────────────────────────────── */}
          {course.quiz && course.quiz.length > 0 && (
            <section className="detail-section">
              <h2>Test Your Knowledge</h2>
              <p className="detail-desc" style={{ marginBottom: 24 }}>
                Challenge yourself with {course.quiz.length} questions based on this course.
                Score 70% or above to earn a completion badge!
              </p>
              <CourseQuiz quiz={course.quiz} />
            </section>
          )}

          {/* Instructor */}
          <section className="detail-section">
            <h2>Your Instructor</h2>
            <div className="instructor-card">
              <div className="avatar lg">{course.instructorAvatar}</div>
              <div>
                <h3 className="instructor-card__name">{course.instructor}</h3>
                <p className="instructor-card__bio">{course.instructorBio}</p>
                <div className="instructor-card__stats">
                  <span>⭐ {course.rating} Rating</span>
                  <span>👥 {course.students.toLocaleString()} Students</span>
                  <span>📚 {course.lessons} Lessons</span>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="detail-section">
            <h2>Student Reviews</h2>
            <div className="reviews-summary">
              <div className="reviews-big-rating">{course.rating}</div>
              <div>
                <div className="stars" style={{ fontSize: "20px" }}>★★★★★</div>
                <div style={{ fontSize: "14px", color: "var(--text-light)", marginTop: 4 }}>
                  Based on {course.reviews.toLocaleString()} reviews
                </div>
              </div>
            </div>
            <div className="reviews-list">
              {[
                {
                  name: "Kavinda H.",
                  rating: 5,
                  text: "Excellent course! The explanations are very clear and the examples relate to our local context.",
                  time: "2 weeks ago",
                },
                {
                  name: "Sathya M.",
                  rating: 5,
                  text: "Best investment I made this year. Already using what I learned at work.",
                  time: "1 month ago",
                },
                {
                  name: "Dilnoza P.",
                  rating: 4,
                  text: "Very good content. Would love to see more practice exercises.",
                  time: "1 month ago",
                },
              ].map((r) => (
                <div key={r.name} className="review-item">
                  <div className="review-item__header">
                    <div className="avatar" style={{ width: 36, height: 36, fontSize: 12 }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <strong>{r.name}</strong>
                      <div className="stars" style={{ fontSize: 12 }}>{"★".repeat(r.rating)}</div>
                    </div>
                    <span className="review-item__time">{r.time}</span>
                  </div>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Related courses */}
      {related.length > 0 && (
        <div className="related-section">
          <div className="container">
            <div className="section-label">More Courses</div>
            <h2 className="section-title">Related Courses</h2>
            <div className="courses-grid" style={{ marginTop: 32 }}>
              {related.map((c) => (
                <CourseCard
                  key={c.id}
                  course={c}
                  onClick={() => navigate("course-detail", { courseId: c.id })}     />
                
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
