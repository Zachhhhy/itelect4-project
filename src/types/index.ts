export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export type ApiCourse = Course;

export enum SubmissionStatus {
  Pending = "pending",
  Submitted = "submitted",
  Graded = "graded",
  Late = "late",
}

// MongoDB document — _id mapped to id (string), studentId stored as string
export interface ApiSubmission {
  id: string;
  studentId: string;
  courseCode: string;
  repoUrl: string;
  submittedAt: string;
  status: SubmissionStatus;
  score?: number;
}

// Shape used when creating a new submission (no id yet)
export type NewSubmission = Omit<ApiSubmission, "id">;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type ID = string;
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive";

export type StudentWithCourse = User & {
  enrolledCourse: Course;
  gpa: number;
};

export type UserUpdate = Partial<User>;
export type CoursePreview = Pick<Course, "code" | "title">;
export type PublicUser = Omit<User, "email" | "isActive">;
export type RoleCount = Record<User["role"], number>;

export interface AiReview {
  summary: string;
  strengths: string[];
  improvements: string[];
  readiness: "ready" | "almost" | "not-yet";
}
