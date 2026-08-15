import { Link, useParams } from "react-router";
import { CourseCard } from "../components/CourseCard";
import { mockCourses, mockSubmissions } from "../data/mockData";

function CourseDetailPage() {
  const { code } = useParams<{ code: string }>();
  const course = mockCourses.find((item) => item.code === code);
  const submissions = mockSubmissions.filter((submission) => submission.courseCode === code);

  if (!course) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800 shadow-sm dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
        <h2 className="text-xl font-bold">Course not found</h2>
        <p className="mt-2 text-sm">No course exists for code {code ?? "unknown"}.</p>
        <Link to="/courses" className="mt-4 inline-block text-sm font-semibold underline">
          Back to courses
        </Link>
      </section>
    );
  }

  return (
    <div>
      <CourseCard course={course} />
      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-lg font-bold text-gray-950 dark:text-white">Submission Activity</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {submissions.length > 0
            ? `${submissions.length} submission record found for ${course.code}.`
            : `No submissions yet for ${course.code}.`}
        </p>
      </section>
    </div>
  );
}

export default CourseDetailPage;
