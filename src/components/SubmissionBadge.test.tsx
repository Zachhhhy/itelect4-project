import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SubmissionBadge } from "./SubmissionBadge";
import { SubmissionStatus, type ApiSubmission } from "../types";

const gradedSubmission: ApiSubmission = {
  id: "submission-1",
  studentId: "student-1",
  courseCode: "ITELECT4",
  repoUrl: "https://github.com/Zachhhhy/itelect4-project",
  submittedAt: "2026-10-24T00:00:00.000Z",
  status: SubmissionStatus.Graded,
  score: 95,
};

describe("SubmissionBadge", () => {
  it("shows the score from the submission prop", () => {
    render(<SubmissionBadge submission={gradedSubmission} />);
    expect(screen.getByText("Score: 95")).toBeInTheDocument();
  });
});
