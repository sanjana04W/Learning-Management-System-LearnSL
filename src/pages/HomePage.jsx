import { useEffect } from "react";
import { courses, categories, testimonials, stats } from "../data/courses";
import CourseCard from "../components/CourseCard";
import "./HomePage.css";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function HomePage({ navigate }) {
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 6);
  useReveal();

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg-orbs">
          <div className="orb orb--1" />
          <div className="orb orb--2" />
          <div className="orb orb--3" />
        </div>
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__pill">
              <span className="hero__pill-dot" />
              🇱🇰 Sri Lanka's #1 Learning Platform
            </div>
            <h1 className="hero__title">
              Learn in Your<br />
              <span className="hero__title-em">Language,</span><br />
              Grow in Your Career
            </h1>
            <p className="hero__desc">
              Quality courses in Sinhala, Tamil & English — from O/L prep to professional skills.
              Join 50,000+ Sri Lankan learners today.
            </p>
            <div className="hero__actions">
              <button className="btn-hero-primary" onClick={() => navigate("courses", { category: "all" })}>
                Explore Courses
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-hero-secondary" onClick={() => navigate("courses", { category: "ol" })}>
                O/L Preparation
              </button>
            </div>
            <div className="hero__stats">
              {stats.map((s) => (
                <div key={s.label} className="hero__stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__img-frame">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=85"
                alt="Student learning"
              />
              <div className="hero__img-overlay" />
              <div className="hero__img-badge">සිංහල · தமிழ் · English</div>
            </div>
            <div className="hero__float-card hero__float-card--1">
              <span>🏆</span>
              <div><strong>Top Rated</strong><p>O/L Mathematics</p></div>
            </div>
            <div className="hero__float-card hero__float-card--2">
              <span>👨‍🎓</span>
              <div><strong>12,000+ students</strong><p>Python Sinhala</p></div>
            </div>
            <div className="hero__float-card hero__float-card--3">
              <span>⭐</span>
              <div><strong>4.8 Rating</strong><p>Avg. course score</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section reveal">
        <div className="container">
          <div className="section-eyebrow">Browse by Subject</div>
          <h2 className="section-title">Explore Categories</h2>
          <div className="categories-grid">
            {categories.filter((c) => c.id !== "all").map((cat, i) => (
              <button
                key={cat.id}
                className="category-card"
                style={{ animationDelay: `${i * 0.07}s` }}
                onClick={() => navigate("courses", { category: cat.id })}
              >
                <div className="category-card__img-wrap">
                  <img src={cat.image} alt={cat.label} className="category-card__img" />
                  <div className="category-card__shimmer" />
                </div>
                <span className="category-card__label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="section section--tinted reveal">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">Handpicked for You</div>
              <h2 className="section-title">Featured Courses</h2>
            </div>
            <button className="btn-outline" onClick={() => navigate("courses", { category: "all" })}>
              View All Courses →
            </button>
          </div>
          <div className="courses-grid">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => navigate("course-detail", { courseId: course.id })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why LearnSL ── */}
      <section className="section reveal">
        <div className="container">
          <div className="section-eyebrow">Why Us</div>
          <h2 className="section-title">Built for Sri Lankan Learners</h2>
          <div className="why-grid">
            {[
              { icon: "🗣️", title: "Your Language", desc: "Courses taught in Sinhala, Tamil & English so language is never a barrier." },
              { icon: "📱", title: "Learn Anywhere", desc: "Mobile-friendly platform. Study during your commute, lunch break, or at home." },
              { icon: "💳", title: "Affordable Pricing", desc: "Pay in Sri Lankan Rupees. Courses from LKR 1,200. Installment plans available." },
              { icon: "🎓", title: "Certified Instructors", desc: "All instructors are verified Sri Lankan educators with proven track records." },
              { icon: "📜", title: "Certificates", desc: "Earn recognized certificates to boost your CV and LinkedIn profile." },
              { icon: "🔄", title: "Lifetime Access", desc: "Buy once, learn forever. Course content is updated regularly at no extra cost." },
            ].map((item, i) => (
              <div key={item.title} className="why-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="why-card__icon-wrap">
                  <div className="why-card__icon">{item.icon}</div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section section--green reveal">
        <div className="container">
          <div className="section-eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>Student Stories</div>
          <h2 className="section-title" style={{ color: "#fff" }}>What Our Learners Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={t.name} className="testimonial-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="testimonial-card__quote">"</div>
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__author">
                  <div className="avatar">{t.avatar}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.location} · {t.course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section reveal">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner__bg-pattern" />
            <div className="cta-banner__content">
              <div className="cta-banner__tag">🚀 Start Today</div>
              <h2>Ready to Start Learning?</h2>
              <p>Join thousands of Sri Lankans who transformed their lives with LearnSL.</p>
            </div>
            <button className="btn-cta" onClick={() => navigate("courses", { category: "all" })}>
              Browse All Courses
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
