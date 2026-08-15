import { SubmissionStatus } from "../types";
import type { Course, Submission, User } from "../types";

export const mockUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

export const mockCourses: Course[] = [
  {
    code: "ITELECT4",
    title: "IT Elective 4",
    units: 3,
    semester: "1st Semester 2026-2027",
  },
  {
    code: "ITPROG3",
    title: "Web Systems and Technologies",
    units: 3,
    semester: "1st Semester 2026-2027",
  },
  {
    code: "ITELECT5",
    title: "Mobile Application Development",
    units: 3,
    semester: "1st Semester 2026-2027",
  },
];

export const mockSubmissions: Submission[] = [
  {
    id: 1,
    studentId: 1,
    courseCode: "ITELECT4",
    repoUrl: "https://github.com/example/coursework-submission",
    submittedAt: new Date("2026-08-15"),
    status: SubmissionStatus.Submitted,
  },
  {
    id: 2,
    studentId: 1,
    courseCode: "ITPROG3",
    repoUrl: "https://github.com/example/web-systems-output",
    submittedAt: new Date("2026-08-12"),
    status: SubmissionStatus.Graded,
    score: 94,
  },
];
