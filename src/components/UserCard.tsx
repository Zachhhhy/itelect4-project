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
    <article className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <p>Status: {user.isActive ? "Active" : "Inactive"}</p>
      <button type="button" onClick={handleSelect}>
        Select user
      </button>
    </article>
  );
}
