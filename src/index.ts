import { SubmissionStatus } from "../types/index";
import type {
  ApiResponse,
  Course,
  CoursePreview,
  PublicUser,
  RoleCount,
  StringOrNumber,
  Submission,
  User,
  UserUpdate,
} from "../types/index";

const projectName: string = "itelect4-project";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}

logMessage(greet(projectName, currentYear));

let anything: any = "hello";
anything = 42;
anything = true;

let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

function throwError(message: string): never {
  throw new Error(message);
}

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const course: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester 2026-2027",
};

console.log(student);
console.log(course);

function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input.toFixed(2);
}

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return value;
}

console.log(processInput("hello"));
console.log(processInput(3.14159));
console.log(formatDate(new Date()));

function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstStudent = getFirst<User>([student]);

const userUpdate: UserUpdate = {
  name: "Juan D. Cruz",
};

const coursePreview: CoursePreview = {
  code: course.code,
  title: course.title,
};

const publicUser: PublicUser = {
  id: student.id,
  name: student.name,
  role: student.role,
};

const roleCount: RoleCount = {
  student: 1,
  admin: 0,
  instructor: 0,
};

const submission: Submission = {
  id: 1,
  studentId: 1,
  courseCode: course.code,
  repoUrl: "https://github.com/example/coursework-submission",
  submittedAt: new Date(),
  status: SubmissionStatus.Submitted,
};

const submissionResponse: ApiResponse<Submission> = {
  success: true,
  data: submission,
  message: "Submission recorded.",
};

console.log(firstStudent);
console.log(userUpdate);
console.log(coursePreview);
console.log(publicUser);
console.log(roleCount);
console.log(submissionResponse);
