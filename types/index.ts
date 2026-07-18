export interface User {
  id: string | number;
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

export enum SubmissionStatus {
  Pending = "pending",
  Submitted = "submitted",
  Graded = "graded",
  Late = "late",
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  status: SubmissionStatus;
  score?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type ID = number | string;
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
