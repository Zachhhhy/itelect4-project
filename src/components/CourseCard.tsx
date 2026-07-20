import type { Course } from "../types";

export interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="card">
      <h2>{course.code}</h2>
      <p>{course.title}</p>
      <p>Units: {course.units}</p>
      <p>Semester: {course.semester}</p>
    </article>
  );
}
