import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useUIStore } from "../store/uiStore";

function Layout() {
  const navigate = useNavigate();
  const name = useAuthStore((state) => state.name);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
    }`;

  function handleLogout(): void {
    logout();
    navigate("/login");
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-normal text-gray-950 dark:text-white">
                  Coursework Submission Tracker
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Track course enrollment and GitHub-based coursework submissions.
                </p>
              </div>
              <button
                type="button"
                onClick={toggleDarkMode}
                className="w-fit rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white dark:focus:ring-offset-gray-950"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>

            <nav className="flex flex-wrap items-center gap-2" aria-label="Main navigation">
              <NavLink to="/" end className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/courses" className={navLinkClass}>
                Courses
              </NavLink>
              <NavLink to="/submissions" className={navLinkClass}>
                Submissions
              </NavLink>
              {token ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  Logout{name ? ` (${name})` : ""}
                </button>
              ) : (
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
              )}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
