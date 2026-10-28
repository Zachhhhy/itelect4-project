# ITELECT4 Project — Frontend

A full-stack course submission portal built for ITELECT4. Students can browse available courses, view course details, register/log in, and submit their course selections. The frontend is a React + TypeScript single-page application powered by Vite, communicating with a live REST API backend.

---

## 🚀 Live URLs

| Service  | URL |
|----------|-----|
| **Frontend** | [https://itelect4-project-wheat.vercel.app](https://itelect4-project-wheat.vercel.app) |
| **Backend API** | [https://itelect4-project-backend.vercel.app](https://itelect4-project-backend.vercel.app) |

---

## 🛠 Technologies Used

| Category | Technology |
|----------|-----------|
| Framework | React (latest) with TypeScript |
| Build Tool | Vite |
| Routing | React Router v8 |
| State Management | Zustand |
| Server State | TanStack Query (React Query v5) |
| Forms | React Hook Form + Zod validation |
| UI Components | shadcn/ui + Base UI |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Font | Geist Variable |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── api/          # API client & endpoint functions
├── components/   # Shared UI components (Layout, ProtectedRoute, etc.)
├── hooks/        # Custom React hooks
├── lib/          # Utility helpers
├── pages/        # Route-level page components
│   ├── CoursesPage.tsx
│   ├── CourseDetailPage.tsx
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── SubmissionsPage.tsx
│   └── NotFoundPage.tsx
├── schemas/      # Zod validation schemas
├── store/        # Zustand auth store
└── types/        # Shared TypeScript types
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### 1. Clone the repository

```bash
git clone https://github.com/Zachhhhy/itelect4-project.git
cd itelect4-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://itelect4-project-backend.vercel.app
```

> For local development against a local backend, use `VITE_API_URL=http://localhost:5000`.

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 5. Build for production

```bash
npm run build
```

---

## 🔐 Authentication

- **Register** at `/register` — creates a new account via `POST /api/auth/register`
- **Login** at `/login` — authenticates via `POST /api/auth/login` and stores the JWT in Zustand (persisted to `localStorage`)
- **Protected routes** (e.g. `/submissions`) require a valid session; unauthenticated users are redirected to `/login`

---

## 📡 API Endpoints Used

All requests go to the backend at `VITE_API_URL`:

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `GET` | `/api/courses` | ❌ | List all courses |
| `GET` | `/api/courses/:code` | ❌ | Get course by code |
| `POST` | `/api/auth/register` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Log in and receive JWT |
| `GET` | `/api/submissions` | ✅ | Get current user's submissions |
| `POST` | `/api/submissions` | ✅ | Submit a course |

---

## 🌐 Deployment

This frontend is deployed on **Vercel** via GitHub integration.

**Environment variable required on Vercel:**

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://itelect4-project-backend.vercel.app` |

[![CI](https://github.com/Zachhhhy/itelect4-project/actions/workflows/ci.yml/badge.svg)](https://github.com/Zachhhhy/itelect4-project/actions/workflows/ci.yml)

> **Note:** Vercel does not expose variables prefixed with `VITE_` as secrets — set them as plain **Environment Variables** in your Vercel project settings.
