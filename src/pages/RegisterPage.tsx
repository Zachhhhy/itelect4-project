import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { registerUser } from "../api/client";
import { useAuthStore } from "../store/authStore";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "instructor">("student");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    try {
      const res = await registerUser(name.trim(), email.trim(), password, role);
      setSession(res.user.name, res.user.email, res.user.role, res.token);
      navigate("/submissions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section className="max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-950 dark:text-white">Register</h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        Create an account to submit and review coursework.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <Label htmlFor="name" className="text-foreground">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Juan dela Cruz"
            required
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="juan@example.com"
            required
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="role" className="text-foreground">
            Role
          </Label>
          <select
            id="role"
            value={role}
            onChange={(event) => setRole(event.target.value as "student" | "instructor")}
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        {error && (
          <p className="rounded-md bg-red-50 p-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </p>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating account…" : "Register"}
        </Button>
      </form>

      <div className="mt-5 border-t border-gray-200 pt-4 text-center text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
          Login here
        </Link>
      </div>
    </section>
  );
}

export default RegisterPage;
