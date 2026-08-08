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
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
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

  if (isLoading) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <main className="min-h-screen bg-gray-50 p-6 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
          <div className="mx-auto max-w-5xl animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            Loading coursework data...
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <main className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
          <section className="mx-auto max-w-5xl rounded-lg border border-red-200 bg-red-50 p-5 text-red-800 shadow-sm dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
            <h1 className="text-lg font-bold">Could not load coursework data.</h1>
            <p className="mt-2 text-sm">Please refresh the page or try again later.</p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-gray-100">
        <div className="mx-auto max-w-6xl">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-normal text-gray-950 sm:text-4xl dark:text-white">
                Coursework Submission Tracker
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base dark:text-gray-300">
                Track course enrollment and GitHub-based coursework submissions.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="w-fit rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white dark:focus:ring-offset-gray-900"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </header>

          <section
            className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            aria-label="Course filters"
          >
            <label
              htmlFor="course-search"
              className="block text-sm font-bold text-gray-800 dark:text-gray-100"
            >
              Search courses
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="course-search"
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by code or title"
                className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900"
              />
              <button
                type="button"
                onClick={toggleDetails}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                {showDetails ? "Hide" : "Show"} details
              </button>
              <button
                type="button"
                onClick={() => setIsError(true)}
                className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 dark:bg-red-950/50 dark:text-red-200 dark:hover:bg-red-900/60"
              >
                Simulate error
              </button>
            </div>
            {previousSearch !== undefined && previousSearch !== searchTerm && (
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Previous search: {previousSearch || "empty"}
              </p>
            )}
          </section>

          <section
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Coursework tracker data"
          >
            <UserCard user={mockUser} onSelect={handleUserSelect} />
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.code}
                course={course}
                variant={index === 0 ? "default" : "compact"}
              />
            ))}
            {submissions.map((submission) => (
              <SubmissionBadge key={submission.id} submission={submission}>
                <p>Awaiting instructor review.</p>
              </SubmissionBadge>
            ))}
          </section>

          <section
            className="mt-6 border-t border-gray-200 pt-5 dark:border-gray-700"
            aria-label="Current selection"
          >
            <h2 className="text-lg font-bold text-gray-950 dark:text-white">Current Selection</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {selectedUser
                ? `${selectedUser.name} is selected for review.`
                : "No user selected yet."}
            </p>
            {showDetails && (
              <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Showing {filteredCourses.length} of {courses.length} loaded courses.
                </p>
                {filteredCourses.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {filteredCourses.map((course) => (
                      <li key={course.code}>
                        <strong className="text-gray-950 dark:text-white">{course.code}</strong>: {" "}
                        {course.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
                    No courses match your search.
                  </p>
                )}
              </div>
            )}
          </section>

          {filteredCourses.length === 0 && !showDetails && (
            <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
              No courses match your search.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
