import type { ApiCourse, ApiSubmission, NewSubmission } from "../types";

// ─── Base URLs ────────────────────────────────────────────────────────────────
// Submissions & auth go to the live Express/Vercel backend.
// Courses are served from a static list (no courses endpoint on the backend).
const API_BASE_URL = import.meta.env.VITE_API_URL as string;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAuthHeaders(): Record<string, string> {
  // Avoid importing zustand here to prevent a circular-dep risk;
  // read directly from localStorage where zustand persists the token.
  try {
    const raw = localStorage.getItem("itelect4-auth");
    const parsed = raw ? (JSON.parse(raw) as { state?: { token?: string } }) : null;
    const token = parsed?.state?.token ?? null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { message?: string };
    throw new Error(body.message ?? `API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "student" | "admin" | "instructor";
    isActive: boolean;
  };
}

export type LoginResponse = AuthResponse;
export type RegisterResponse = AuthResponse;

export function loginUser(email: string, password: string): Promise<LoginResponse> {
  return request<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser(
  name: string,
  email: string,
  password: string,
  role: "student" | "admin" | "instructor" = "student"
): Promise<RegisterResponse> {
  return request<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role }),
  });
}

// ─── Courses (static — backend has no /courses route) ─────────────────────────

const STATIC_COURSES: ApiCourse[] = [
  { code: "ITELECT4", title: "IT Elective 4", units: 3, semester: "1st Semester 2026-2027" },
  { code: "ITPROG3",  title: "Web Systems and Technologies", units: 3, semester: "1st Semester 2026-2027" },
  { code: "ITELECT5", title: "Mobile Application Development", units: 3, semester: "1st Semester 2026-2027" },
];

export function getCourses(): Promise<ApiCourse[]> {
  return Promise.resolve(STATIC_COURSES);
}

export function getCourse(code: string): Promise<ApiCourse | null> {
  const found = STATIC_COURSES.find(
    (c) => c.code.toLowerCase() === code.toLowerCase()
  ) ?? null;
  return Promise.resolve(found);
}

// ─── Submissions ──────────────────────────────────────────────────────────────

interface SubmissionsEnvelope {
  success: boolean;
  count: number;
  data: ApiSubmission[];
}

interface SubmissionEnvelope {
  success: boolean;
  message: string;
  data: ApiSubmission;
}

export function getSubmissions(): Promise<ApiSubmission[]> {
  return request<SubmissionsEnvelope>("/api/submissions").then((res) => res.data);
}

export function getSubmissionsByCourse(courseCode: string): Promise<ApiSubmission[]> {
  return getSubmissions().then((submissions) =>
    submissions.filter(
      (s) => s.courseCode.toLowerCase() === courseCode.toLowerCase()
    )
  );
}

export function createSubmission(submission: NewSubmission): Promise<ApiSubmission> {
  return request<SubmissionEnvelope>("/api/submissions", {
    method: "POST",
    body: JSON.stringify(submission),
  }).then((res) => res.data);
}
