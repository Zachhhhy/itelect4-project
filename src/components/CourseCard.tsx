import type { Course } from "../types";

export interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact";
}

export function CourseCard({ course, variant = "default" }: CourseCardProps) {
  const isCompact = variant === "compact";

  return (
    <article
      className={`rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${
        isCompact ? "p-3" : "p-5"
      }`}
    >
      <h2
        className={`font-bold text-gray-950 dark:text-white ${
          isCompact ? "text-base" : "text-lg"
        }`}
      >
        {course.code}
      </h2>
      {!isCompact && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{course.title}</p>
      )}
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Units: {course.units}</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Semester: {course.semester}
      </p>
    </article>
  );
}
