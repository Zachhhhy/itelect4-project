import type { ApiCourse, ApiSubmission, NewSubmission, User } from "../types";

const API_BASE_URL = "http://localhost:3001";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function getLearners(): Promise<User[]> {
  return request<User[]>("/learners");
}

export function getCourses(): Promise<ApiCourse[]> {
  return request<ApiCourse[]>("/courses");
}

export function getCourse(code: string): Promise<ApiCourse | null> {
  return request<ApiCourse[]>(`/courses?code=${encodeURIComponent(code)}`).then(
    (courses) => courses[0] ?? null,
  );
}

export function getSubmissions(): Promise<ApiSubmission[]> {
  return request<ApiSubmission[]>("/submissions");
}

export function getSubmissionsByCourse(courseCode: string): Promise<ApiSubmission[]> {
  return request<ApiSubmission[]>(
    `/submissions?courseCode=${encodeURIComponent(courseCode)}`,
  );
}

export function createSubmission(submission: NewSubmission): Promise<ApiSubmission> {
  return request<ApiSubmission>("/submissions", {
    method: "POST",
    body: JSON.stringify(submission),
  });
}
