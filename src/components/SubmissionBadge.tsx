import type { FC, ReactNode } from "react";
import type { Submission } from "../types";

export interface SubmissionBadgeProps {
  submission: Submission;
  children?: ReactNode;
}

export const SubmissionBadge: FC<SubmissionBadgeProps> = ({ submission, children }) => {
  return (
    <article className="card badge">
      <h2>{submission.courseCode}</h2>
      <p>
        Repository: <a href={submission.repoUrl}>{submission.repoUrl}</a>
      </p>
      <p>Status: {submission.status}</p>
      <p>Submitted: {submission.submittedAt.toLocaleDateString()}</p>
      <p>Score: {submission.score ?? "Not graded yet"}</p>
      {children}
    </article>
  );
};
