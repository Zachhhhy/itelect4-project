import type { MouseEvent } from "react";
import type { User } from "../types";

export interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

export function UserCard({ user, onSelect }: UserCardProps) {
  function handleSelect(event: MouseEvent<HTMLButtonElement>): void {
    event.currentTarget.blur();
    onSelect(user);
  }

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-lg font-bold text-gray-950 dark:text-white">{user.name}</h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Role: {user.role}</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Status: {" "}
        <span className="font-semibold text-emerald-700 dark:text-emerald-300">
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </p>
      <button
        type="button"
        onClick={handleSelect}
        className="mt-4 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Select user
      </button>
    </article>
  );
}
