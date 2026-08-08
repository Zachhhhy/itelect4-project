import type { FC, ReactNode } from "react";
import type { Submission } from "../types";

export interface SubmissionBadgeProps {
  submission: Submission;
  children?: ReactNode;
}

export const SubmissionBadge: FC<SubmissionBadgeProps> = ({ submission, children }) => {
  return (
    <article className="rounded-lg border border-blue-100 border-l-4 border-l-blue-600 bg-white p-5 shadow-sm dark:border-gray-700 dark:border-l-blue-400 dark:bg-gray-800">
      <h2 className="text-lg font-bold text-gray-950 dark:text-white">{submission.courseCode}</h2>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        Repository: {" "}
        <a
          href={submission.repoUrl}
          className="font-medium text-blue-700 underline-offset-2 hover:underline dark:text-blue-300"
        >
          {submission.repoUrl}
        </a>
      </p>
      <p className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
        Status: {submission.status}
      </p>
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Submitted: {submission.submittedAt.toLocaleDateString()}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Score: {submission.score ?? "Not graded yet"}
      </p>
      {children && <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">{children}</div>}
    </article>
  );
};
