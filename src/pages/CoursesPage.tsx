import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getCourses } from "../api/client";
import { CourseCard } from "../components/CourseCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
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
        <Label htmlFor="course-search" className="text-foreground">
          Search courses
        </Label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Input
            id="course-search"
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by code or title"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={toggleDetails}
            variant="outline"
          >
            {showDetails ? "Hide" : "Show"} details
          </Button>
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
