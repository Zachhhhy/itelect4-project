import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  name: string | null;
  token: string | null;
  login: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      name: null,
      token: null,
      login: (name) =>
        set({
          name,
          token: `session-${name.trim().toLowerCase().replace(/\s+/g, "-")}`,
        }),
      logout: () => set({ name: null, token: null }),
    }),
    {
      name: "itelect4-auth",
      partialize: (state) => ({ name: state.name, token: state.token }),
    },
  ),
);
