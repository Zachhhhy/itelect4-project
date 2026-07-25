import "./App.css";
import { useEffect, useRef, useState } from "react";
import { CourseCard } from "./components/CourseCard";
import { SubmissionBadge } from "./components/SubmissionBadge";
import { UserCard } from "./components/UserCard";
import usePrevious from "./hooks/usePrevious";
import useToggle from "./hooks/useToggle";
import { SubmissionStatus } from "./types";
import type { Course, Submission, User } from "./types";

const mockUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const mockCourse: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester 2026-2027",
};

const mockCourses: Course[] = [
  mockCourse,
  {
    code: "ITPROG3",
    title: "Web Systems and Technologies",
    units: 3,
    semester: "1st Semester 2026-2027",
  },
  {
    code: "ITELECT5",
    title: "Mobile Application Development",
    units: 3,
    semester: "1st Semester 2026-2027",
  },
];

const mockSubmissions: Submission[] = [
  {
    id: 1,
    studentId: 1,
    courseCode: mockCourse.code,
    repoUrl: "https://github.com/example/coursework-submission",
    submittedAt: new Date(),
    status: SubmissionStatus.Submitted,
  },
];

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showDetails, toggleDetails] = useToggle(false);
  const previousSearch = usePrevious<string>(searchTerm);

  useEffect(() => {
    setCourses(mockCourses);
    setSubmissions(mockSubmissions);
    setIsLoading(false);
    searchInputRef.current?.focus();
  }, []);

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchTerm(event.target.value);
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredCourses = courses.filter((course) => {
    return (
      course.code.toLowerCase().includes(normalizedSearch) ||
      course.title.toLowerCase().includes(normalizedSearch)
    );
  });

  return (
    <main className="app-shell">
      <header>
        <h1>Coursework Submission Tracker</h1>
        <p>Track course enrollment and GitHub-based coursework submissions.</p>
      </header>

      <section className="toolbar" aria-label="Course filters">
        <label htmlFor="course-search">Search courses</label>
        <div className="search-row">
          <input
            id="course-search"
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by code or title"
          />
          <button type="button" onClick={toggleDetails}>
            {showDetails ? "Hide" : "Show"} details
          </button>
        </div>
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="meta">Previous search: {previousSearch || "empty"}</p>
        )}
      </section>

      {isLoading ? (
        <p className="loading">Loading coursework data...</p>
      ) : (
        <section className="card-grid" aria-label="Coursework tracker data">
          <UserCard user={mockUser} onSelect={handleUserSelect} />
          {filteredCourses.map((course) => (
            <CourseCard key={course.code} course={course} />
          ))}
          {submissions.map((submission) => (
            <SubmissionBadge key={submission.id} submission={submission}>
              <p>Awaiting instructor review.</p>
            </SubmissionBadge>
          ))}
        </section>
      )}

      <section className="summary" aria-label="Current selection">
        <h2>Current Selection</h2>
        <p>
          {selectedUser
            ? `${selectedUser.name} is selected for review.`
            : "No user selected yet."}
        </p>
        {showDetails && (
          <div className="details-panel">
            <p>
              Showing {filteredCourses.length} of {courses.length} loaded courses.
            </p>
            {filteredCourses.length > 0 ? (
              <ul className="course-list">
                {filteredCourses.map((course) => (
                  <li key={course.code}>
                    <strong>{course.code}</strong>: {course.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No courses match your search.</p>
            )}
          </div>
        )}
      </section>

      {filteredCourses.length === 0 && !isLoading && !showDetails && (
        <p className="empty-state">No courses match your search.</p>
      )}
    </main>
  );
}

export default App;