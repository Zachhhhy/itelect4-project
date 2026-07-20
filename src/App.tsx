import "./App.css";
import { CourseCard } from "./components/CourseCard";
import { SubmissionBadge } from "./components/SubmissionBadge";
import { UserCard } from "./components/UserCard";
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

const mockSubmission: Submission = {
  id: 1,
  studentId: 1,
  courseCode: mockCourse.code,
  repoUrl: "https://github.com/example/coursework-submission",
  submittedAt: new Date(),
  status: SubmissionStatus.Submitted,
};

function App() {
  const handleUserSelect = (user: User): void => {
    console.log("Selected user:", user.name);
  };

  return (
    <main className="app-shell">
      <header>
        <h1>Coursework Submission Tracker</h1>
        <p>Track course enrollment and GitHub-based coursework submissions.</p>
      </header>

      <section className="card-grid" aria-label="Coursework tracker examples">
        <UserCard user={mockUser} onSelect={handleUserSelect} />
        <CourseCard course={mockCourse} />
        <SubmissionBadge submission={mockSubmission}>
          <p>Awaiting instructor review.</p>
        </SubmissionBadge>
      </section>
    </main>
  );
}

export default App;
