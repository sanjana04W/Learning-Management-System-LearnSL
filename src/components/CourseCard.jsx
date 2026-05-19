export default function CourseCard({ course, onClick }) {
  return (
    <div className="course-card fade-up" onClick={onClick}>
      <img
        className="course-card__img"
        src={course.image}
        alt={course.title}
        loading="lazy"
      />
      <div className="course-card__body">
        <div className="course-card__badges">
          <span className="badge badge-lang">{course.language}</span>
          <span className="badge badge-level">{course.level}</span>
        </div>
        <div className="course-card__title">{course.title}</div>
        <div className="course-card__instructor">by {course.instructor}</div>
        <div className="course-card__meta">
          <span className="course-card__rating">
            <span className="stars">★</span>
            {course.rating}
          </span>
          <span>({course.reviews.toLocaleString()})</span>
          <span>·</span>
          <span>{course.lessons} lessons</span>
        </div>
      </div>
      <div className="course-card__footer">
        <div>
          <span className="course-card__price">LKR {course.price.toLocaleString()}</span>
          <span className="course-card__original-price">LKR {course.originalPrice.toLocaleString()}</span>
        </div>
        <span className="badge badge-category">{course.duration}</span>
      </div>
    </div>
  );
}
