import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getCourse, getSubmissionsByCourse } from "../api/client";
import { CourseCard } from "../components/CourseCard";

function CourseDetailPage() {
  const { code } = useParams<{ code: string }>();
  const courseCode = code ?? "";
  const courseQuery = useQuery({
    queryKey: ["courses", courseCode],
    queryFn: () => getCourse(courseCode),
    enabled: courseCode.length > 0,
  });
  const submissionsQuery = useQuery({
    queryKey: ["submissions", courseCode],
    queryFn: () => getSubmissionsByCourse(courseCode),
    enabled: courseCode.length > 0,
  });

  if (courseQuery.isLoading || submissionsQuery.isLoading) {
    return <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">Loading course...</div>;
  }

  if (courseQuery.isError || submissionsQuery.isError) {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800 shadow-sm dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">Could not load course data. Run npm run api in another terminal and try again.</div>;
  }

  if (!courseQuery.data) {
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

  const submissions = submissionsQuery.data ?? [];

  return (
    <div>
      <CourseCard course={courseQuery.data} />
      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-lg font-bold text-gray-950 dark:text-white">Submission Activity</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {submissions.length > 0
            ? `${submissions.length} submission record found for ${courseQuery.data.code}.`
            : `No submissions yet for ${courseQuery.data.code}.`}
        </p>
      </section>
    </div>
  );
}

export default CourseDetailPage;
