import { useState, useMemo } from "react";
import { courses, categories } from "../data/courses";
import CourseCard from "../components/CourseCard";
import "./CoursesPage.css";

const LANGUAGES = ["All", "Sinhala", "Tamil", "English"];
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage({ navigate, initialCategory = "all" }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [language, setLanguage] = useState("All");
  const [level, setLevel] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");

  const filtered = useMemo(() => {
    let list = [...courses];
    if (activeCategory !== "all") list = list.filter((c) => c.category === activeCategory);
    if (language !== "All") list = list.filter((c) => c.language === language);
    if (level !== "All") list = list.filter((c) => c.level === level);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sortBy === "popular") list.sort((a, b) => b.students - a.students);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "price-low") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategory, language, level, search, sortBy]);

  return (
    <div className="courses-page">
      {/* Page header */}
      <div className="courses-page__header">
        <div className="container">
          <div className="section-label">Explore</div>
          <h1>All Courses</h1>
          <p>
            {filtered.length} course{filtered.length !== 1 ? "s" : ""} available
            {activeCategory !== "all" ? ` in ${categories.find((c) => c.id === activeCategory)?.label}` : ""}
          </p>
        </div>
      </div>

      <div className="container courses-page__body">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar__section">
            <h3>Category</h3>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`sidebar__option ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="sidebar__section">
            <h3>Language</h3>
            {LANGUAGES.map((l) => (
              <button
                key={l}
                className={`sidebar__option ${language === l ? "active" : ""}`}
                onClick={() => setLanguage(l)}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="sidebar__section">
            <h3>Level</h3>
            {LEVELS.map((lv) => (
              <button
                key={lv}
                className={`sidebar__option ${level === lv ? "active" : ""}`}
                onClick={() => setLevel(lv)}
              >
                {lv}
              </button>
            ))}
          </div>

          <button
            className="btn-ghost"
            onClick={() => { setActiveCategory("all"); setLanguage("All"); setLevel("All"); setSearch(""); }}
            style={{ marginTop: 8, fontSize: "13px" }}
          >
            Clear Filters
          </button>
        </aside>

        {/* Main */}
        <main className="courses-main">
          {/* Toolbar */}
          <div className="courses-toolbar">
            <input
              className="courses-search"
              placeholder="Search courses, instructors, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="courses-toolbar__right">
              <select
                className="courses-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="view-toggle">
                <button
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >⊞</button>
                <button
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                  title="List view"
                >☰</button>
              </div>
            </div>
          </div>

          {/* Active filters */}
          <div className="active-filters">
            {activeCategory !== "all" && (
              <span className="filter-chip">
                {categories.find((c) => c.id === activeCategory)?.label}
                <button onClick={() => setActiveCategory("all")}>×</button>
              </span>
            )}
            {language !== "All" && (
              <span className="filter-chip">
                {language}
                <button onClick={() => setLanguage("All")}>×</button>
              </span>
            )}
            {level !== "All" && (
              <span className="filter-chip">
                {level}
                <button onClick={() => setLevel("All")}>×</button>
              </span>
            )}
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="empty-state">
              <span>🔍</span>
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "courses-grid-main" : "courses-list"}>
              {filtered.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => navigate("course-detail", { courseId: course.id })}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
