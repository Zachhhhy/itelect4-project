import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserCard } from "../components/UserCard";
import { getCourses, getLearners, getSubmissions } from "../api/client";
import type { User } from "../types";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const coursesQuery = useQuery({ queryKey: ["courses"], queryFn: getCourses });
  const submissionsQuery = useQuery({ queryKey: ["submissions"], queryFn: getSubmissions });
  const learnersQuery = useQuery({ queryKey: ["learners"], queryFn: getLearners });
  const activeLearner = learnersQuery.data?.[0] ?? null;
  const isLoading = coursesQuery.isLoading || submissionsQuery.isLoading || learnersQuery.isLoading;
  const isError = coursesQuery.isError || submissionsQuery.isError || learnersQuery.isError;

  if (isLoading) {
    return <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">Loading dashboard...</div>;
  }

  if (isError || !activeLearner) {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800 shadow-sm dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">Could not load dashboard data. Run npm run api in another terminal and try again.</div>;
  }

  return (
    <div>
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-950 dark:text-white">Dashboard</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Review the current learner, course load, and submission status in one place.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Tracker summary">
        <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Courses</p>
          <p className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">{coursesQuery.data?.length ?? 0}</p>
        </article>
        <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Submissions</p>
          <p className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">{submissionsQuery.data?.length ?? 0}</p>
        </article>
        <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Active Student</p>
          <p className="mt-2 text-lg font-bold text-gray-950 dark:text-white">{activeLearner.name}</p>
        </article>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2" aria-label="Student review">
        <UserCard user={activeLearner} onSelect={setSelectedUser} />
        <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-bold text-gray-950 dark:text-white">Current Selection</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {selectedUser ? `${selectedUser.name} is selected for review.` : "No user selected yet."}
          </p>
        </article>
      </section>
    </div>
  );
}

export default DashboardPage;
