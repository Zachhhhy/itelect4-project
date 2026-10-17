import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  name: string | null;
  email: string | null;
  role: "student" | "admin" | "instructor" | null;
  token: string | null;
  setSession: (name: string, email: string, role: "student" | "admin" | "instructor", token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      name: null,
      email: null,
      role: null,
      token: null,
      setSession: (name, email, role, token) =>
        set({ name, email, role, token }),
      logout: () => set({ name: null, email: null, role: null, token: null }),
    }),
    {
      name: "itelect4-auth",
      partialize: (state) => ({
        name: state.name,
        email: state.email,
        role: state.role,
        token: state.token,
      }),
    },
  ),
);
