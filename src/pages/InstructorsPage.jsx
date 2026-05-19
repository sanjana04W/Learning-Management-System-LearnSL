import { useState, useMemo } from "react";
import { instructors } from "../data/instructors";
import "./InstructorsPage.css";

export default function InstructorsPage({ navigate }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("students");

  const categories = [
    { id: "all", label: "All Specializations" },
    { id: "ol", label: "O/L Preparation" },
    { id: "al", label: "A/L Preparation" },
    { id: "it", label: "Information Technology" },
    { id: "business", label: "Business & Finance" },
    { id: "language", label: "Languages" },
    { id: "agriculture", label: "Agriculture" },
    { id: "vocational", label: "Vocational Skills" },
  ];

  const filtered = useMemo(() => {
    let list = [...instructors];

    if (selectedCategory !== "all") {
      list = list.filter((i) => i.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.specialization.toLowerCase().includes(q) ||
          i.expertise.some((e) => e.toLowerCase().includes(q))
      );
    }

    if (sortBy === "students") list.sort((a, b) => b.students - a.students);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "experience") list.sort((a, b) => b.yearsMentoring - a.yearsMentoring);

    return list;
  }, [selectedCategory, search, sortBy]);

  return (
    <div className="instructors-page">
      {/* Page header */}
      <div className="instructors-page__header">
        <div className="container">
          <div className="section-label">Meet Our Team</div>
          <h1>Expert Instructors</h1>
          <p>Learn from Sri Lanka's most experienced and certified educators</p>
        </div>
      </div>

      <div className="container">
        <div className="instructors-page__body">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar__section">
              <h3>Specialization</h3>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`sidebar__option ${selectedCategory === cat.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="instructors-main">
            {/* Toolbar */}
            <div className="instructors-toolbar">
              <input
                type="text"
                className="instructors-search"
                placeholder="Search instructors by name or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="instructors-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="students">Most Students</option>
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Results info */}
            <div className="instructors-results-info">
              {filtered.length} instructor{filtered.length !== 1 ? "s" : ""} found
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="instructors-grid">
                {filtered.map((instructor) => (
                  <div
                    key={instructor.id}
                    className="instructor-card"
                    onClick={() => navigate("instructor-detail", { instructorId: instructor.id })}
                  >
                    <div className="instructor-card__header">
                      <div className="instructor-card__image">
                        <div className="instructor-card__avatar">{instructor.avatar}</div>
                        <div className="instructor-card__overlay">
                          <button className="btn-primary btn-sm">View Profile</button>
                        </div>
                      </div>
                    </div>

                    <div className="instructor-card__body">
                      <h3 className="instructor-card__name">{instructor.name}</h3>
                      <p className="instructor-card__specialty">{instructor.specialization}</p>

                      <div className="instructor-card__stats">
                        <div className="stat">
                          <span className="stat__value">{instructor.students.toLocaleString()}</span>
                          <span className="stat__label">Students</span>
                        </div>
                        <div className="stat">
                          <span className="stat__value">{instructor.rating}★</span>
                          <span className="stat__label">Rating</span>
                        </div>
                        <div className="stat">
                          <span className="stat__value">{instructor.yearsMentoring}+</span>
                          <span className="stat__label">Years</span>
                        </div>
                      </div>

                      <p className="instructor-card__bio">{instructor.bio}</p>

                      <div className="instructor-card__expertise">
                        {instructor.expertise.slice(0, 2).map((skill, idx) => (
                          <span key={idx} className="expertise-tag">
                            {skill}
                          </span>
                        ))}
                        {instructor.expertise.length > 2 && (
                          <span className="expertise-tag expertise-tag--more">
                            +{instructor.expertise.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="instructors-empty">
                <div className="empty-icon">🔍</div>
                <h3>No instructors found</h3>
                <p>Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
