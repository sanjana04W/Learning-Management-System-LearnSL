import { useState } from "react";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import InstructorsPage from "./pages/InstructorsPage";
import InstructorDetailPage from "./pages/InstructorDetailPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [user, setUser] = useState(null);

  const navigate = (to, payload = {}) => {
    setPage(to);
    if (payload.courseId) setSelectedCourseId(payload.courseId);
    if (payload.instructorId) setSelectedInstructorId(payload.instructorId);
    if (payload.category) setSelectedCategory(payload.category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <Navbar page={page} navigate={navigate} user={user} setUser={setUser} />
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "courses" && (
        <CoursesPage navigate={navigate} initialCategory={selectedCategory} />
      )}
      {page === "course-detail" && (
        <CourseDetailPage courseId={selectedCourseId} navigate={navigate} />
      )}
      {page === "instructors" && <InstructorsPage navigate={navigate} />}
      {page === "instructor-detail" && (
        <InstructorDetailPage instructorId={selectedInstructorId} navigate={navigate} />
      )}
      {page === "signin" && <SignInPage navigate={navigate} setUser={setUser} />}
      {page === "signup" && <SignUpPage navigate={navigate} setUser={setUser} />}
      {page === "profile" && <ProfilePage navigate={navigate} user={user} setUser={setUser} />}
      <Footer navigate={navigate} />
    </div>
  );
}
