import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-950 dark:text-white">404 - Page Not Found</h2>
      <Link to="/" className="mt-4 inline-block text-sm font-semibold text-blue-600 underline hover:text-blue-700 dark:text-blue-300">
        Go back to the Dashboard
      </Link>
    </section>
  );
}

export default NotFoundPage;
