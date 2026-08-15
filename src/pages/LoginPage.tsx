import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

function LoginPage() {
  const [name, setName] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    login(name.trim() || "Juan dela Cruz");
    navigate("/submissions");
  }

  return (
    <section className="max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-950 dark:text-white">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <label htmlFor="name" className="block text-sm font-bold text-gray-800 dark:text-gray-100">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
