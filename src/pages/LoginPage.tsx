import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
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
        <Label htmlFor="name" className="text-foreground">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
        <Button type="submit">
          Login
        </Button>
      </form>
    </section>
  );
}

export default LoginPage;
