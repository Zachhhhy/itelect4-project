import { useState } from "react";
import { UserCard } from "../components/UserCard";
import { mockCourses, mockSubmissions, mockUser } from "../data/mockData";
import type { User } from "../types";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
          <p className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">
            {mockCourses.length}
          </p>
        </article>
        <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Submissions</p>
          <p className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">
            {mockSubmissions.length}
          </p>
        </article>
        <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Active Student</p>
          <p className="mt-2 text-lg font-bold text-gray-950 dark:text-white">{mockUser.name}</p>
        </article>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2" aria-label="Student review">
        <UserCard user={mockUser} onSelect={setSelectedUser} />
        <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-bold text-gray-950 dark:text-white">Current Selection</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {selectedUser
              ? `${selectedUser.name} is selected for review.`
              : "No user selected yet."}
          </p>
        </article>
      </section>
    </div>
  );
}

export default DashboardPage;
