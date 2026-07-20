# Coursework Submission Tracker

Coursework Submission Tracker is a TypeScript and React application for managing courses and GitHub-based coursework submissions across student, instructor, and admin roles. It keeps the GT1 type foundation for users, courses, submissions, statuses, and typed API responses, then presents those entities through reusable GT2 Part 1 React components.

## GT1 Type Foundation

- `User`
- `Course`
- `Submission`
- `SubmissionStatus`
- `ApiResponse<T>`
- Utility types: `UserUpdate`, `CoursePreview`, `PublicUser`, and `RoleCount`

## GT2 Part 1 React Components

- `UserCard` displays a typed user and exposes a typed select callback.
- `CourseCard` displays course code, title, units, and semester.
- `SubmissionBadge` displays submission details, grading status, and optional child content.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build and Type Check

```bash
npm run build
```
