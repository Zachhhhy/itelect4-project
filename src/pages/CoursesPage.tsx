import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getCourses } from "../api/client";
import { CourseCard } from "../components/CourseCard";
import usePrevious from "../hooks/usePrevious";
import useToggle from "../hooks/useToggle";
import { useUIStore } from "../store/uiStore";

function CoursesPage() {
  const [showDetails, toggleDetails] = useToggle(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTerm = useUIStore((state) => state.courseSearchTerm);
  const setSearchTerm = useUIStore((state) => state.setCourseSearchTerm);
  const previousSearch = usePrevious(searchTerm);
  const coursesQuery = useQuery({ queryKey: ["courses"], queryFn: getCourses });
  const courses = coursesQuery.data ?? [];

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredCourses = courses.filter((course) => {
    return (
      course.code.toLowerCase().includes(normalizedSearch) ||
      course.title.toLowerCase().includes(normalizedSearch)
    );
  });

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value);
  }

  if (coursesQuery.isLoading) {
    return (
      <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        Loading coursework data...
      </div>
    );
  }

  if (coursesQuery.isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800 shadow-sm dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
        Could not load courses. Run npm run api in another terminal and try again.
      </div>
    );
  }

  return (
    <div>
      <section className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <label htmlFor="course-search" className="block text-sm font-bold text-gray-800 dark:text-gray-100">
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
        </div>
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Previous search: {previousSearch || "empty"}
          </p>
        )}
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Courses">
        {filteredCourses.map((course, index) => (
          <Link key={course.code} to={`/courses/${course.code}`} className="block">
            <CourseCard course={course} variant={index === 0 ? "default" : "compact"} />
          </Link>
        ))}
      </section>

      {showDetails && (
        <section className="mt-6 border-t border-gray-200 pt-5 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-950 dark:text-white">Course Matches</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Showing {filteredCourses.length} of {courses.length} loaded courses.
          </p>
        </section>
      )}

      {filteredCourses.length === 0 && (
        <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
          No courses match your search.
        </p>
      )}
    </div>
  );
}

export default CoursesPage;
