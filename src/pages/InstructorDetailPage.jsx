import { courses } from "../data/courses";
import { instructors } from "../data/instructors";
import CourseCard from "../components/CourseCard";
import "./InstructorDetailPage.css";

export default function InstructorDetailPage({ instructorId, navigate }) {
  const instructor = instructors.find((i) => i.id === instructorId);

  if (!instructor) {
    return (
      <div className="instructor-detail-page">
        <div className="container" style={{ paddingTop: "80px", textAlign: "center" }}>
          <h2>Instructor not found</h2>
          <button className="btn-primary" onClick={() => navigate("instructors")} style={{ marginTop: "20px" }}>
            Back to Instructors
          </button>
        </div>
      </div>
    );
  }

  // Get courses by this instructor
  const instructorCourses = courses.filter((c) => c.instructor === instructor.name);

  return (
    <div className="instructor-detail-page">
      {/* Breadcrumb */}
      <div className="detail-breadcrumb">
        <div className="container">
          <div className="detail-breadcrumb__inner">
            <button onClick={() => navigate("instructors")} className="breadcrumb-link">
              Instructors
            </button>
            <span>›</span>
            <span>{instructor.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="instructor-hero">
        <div className="instructor-hero__pattern"></div>
        <div className="container">
          <div className="instructor-hero__inner">
            <div className="instructor-hero__content">
              <div className="instructor-avatar-wrap">
                <div className="instructor-avatar-lg">{instructor.avatar}</div>
                <div className="instructor-avatar-badge"></div>
              </div>

              <div className="instructor-hero__info">
                <h1 className="instructor-hero__name">{instructor.name}</h1>
                <p className="instructor-hero__specialty">{instructor.specialization}</p>
                <p className="instructor-hero__location">📍 {instructor.location}</p>

                <div className="instructor-hero__metrics">
                  <div className="metric">
                    <span className="metric__value">{instructor.students.toLocaleString()}+</span>
                    <span className="metric__label">Students</span>
                  </div>
                  <div className="metric">
                    <span className="metric__value">{instructor.rating}★</span>
                    <span className="metric__label">Rating ({instructor.reviews})</span>
                  </div>
                  <div className="metric">
                    <span className="metric__value">{instructor.yearsMentoring}+</span>
                    <span className="metric__label">Years Teaching</span>
                  </div>
                  <div className="metric">
                    <span className="metric__value">{instructor.courses}</span>
                    <span className="metric__label">Courses</span>
                  </div>
                </div>

                <div className="instructor-hero__contact">
                  <a href={`mailto:${instructor.email}`} className="contact-btn">
                    📧 Email
                  </a>
                  <a href={`tel:${instructor.phone}`} className="contact-btn">
                    📱 Call
                  </a>
                </div>
              </div>
            </div>

            <div className="instructor-sidebar">
              <div className="sidebar-card">
                <h3>Quick Stats</h3>
                <div className="quick-stat">
                  <span className="label">Students Helped</span>
                  <span className="value">{instructor.studentsHelped.toLocaleString()}</span>
                </div>
                <div className="quick-stat">
                  <span className="label">Completion Rate</span>
                  <span className="value">{instructor.completionRate}%</span>
                </div>
                <div className="quick-stat">
                  <span className="label">Email</span>
                  <a href={`mailto:${instructor.email}`} className="email-link">
                    {instructor.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="instructor-detail-body">
        <div className="container">
          <div className="detail-grid">
            <div className="detail-main">
              {/* About Section */}
              <section className="detail-section">
                <h2>About</h2>
                <p className="section-description">{instructor.description}</p>
              </section>

              {/* Expertise Section */}
              <section className="detail-section">
                <h2>Areas of Expertise</h2>
                <div className="expertise-list">
                  {instructor.expertise.map((skill, idx) => (
                    <div key={idx} className="expertise-item">
                      <span className="expertise-icon">✓</span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education Section */}
              <section className="detail-section">
                <h2>Education & Qualifications</h2>
                <div className="timeline">
                  {instructor.education.map((edu, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot">🎓</div>
                      <div className="timeline-content">{edu}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications Section */}
              <section className="detail-section">
                <h2>Certifications & Awards</h2>
                <div className="certifications-list">
                  {instructor.certifications.map((cert, idx) => (
                    <div key={idx} className="certification-item">
                      <span className="cert-icon">🏆</span>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Courses Section */}
              {instructorCourses.length > 0 && (
                <section className="detail-section">
                  <h2>Courses by {instructor.name}</h2>
                  <p className="section-subtitle">
                    Explore {instructorCourses.length} course{instructorCourses.length !== 1 ? "s" : ""} taught by this instructor
                  </p>
                  <div className="courses-grid">
                    {instructorCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onClick={() => navigate("course-detail", { courseId: course.id })}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="detail-sidebar">
              <div className="sidebar-card instructor-card-full">
                <div className="card-image-container">
                  <img src={instructor.image} alt={instructor.name} className="card-image" />
                </div>
                <div className="card-content">
                  <h3>{instructor.name}</h3>
                  <p className="specialty">{instructor.specialization}</p>

                  <div className="stats-section">
                    <div className="stat-item">
                      <span className="stat-label">Rating</span>
                      <span className="stat-value">{instructor.rating}★</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Students</span>
                      <span className="stat-value">{instructor.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <button className="btn-primary full-width" onClick={() => navigate("instructors")}>
                    Back to Instructors
                  </button>
                </div>
              </div>

              {/* Social Links */}
              {instructor.socialLinks && (
                <div className="sidebar-card">
                  <h4>Connect</h4>
                  <div className="social-links">
                    {instructor.socialLinks.linkedin !== "#" && (
                      <a href={instructor.socialLinks.linkedin} className="social-link" title="LinkedIn">
                        in
                      </a>
                    )}
                    {instructor.socialLinks.twitter !== "#" && (
                      <a href={instructor.socialLinks.twitter} className="social-link" title="Twitter">
                        𝕏
                      </a>
                    )}
                    {instructor.socialLinks.website !== "#" && (
                      <a href={instructor.socialLinks.website} className="social-link" title="Website">
                        🌐
                      </a>
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
