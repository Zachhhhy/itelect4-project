import { create } from "zustand";

interface AuthState {
  name: string | null;
  token: string | null;
  login: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  name: null,
  token: null,
  login: (name) =>
    set({
      name,
      token: `session-${name.trim().toLowerCase().replace(/\s+/g, "-")}`,
    }),
  logout: () => set({ name: null, token: null }),
}));
