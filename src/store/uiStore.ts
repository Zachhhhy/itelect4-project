import { create } from "zustand";

interface UIState {
  isDarkMode: boolean;
  courseSearchTerm: string;
  toggleDarkMode: () => void;
  setCourseSearchTerm: (searchTerm: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: false,
  courseSearchTerm: "",
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setCourseSearchTerm: (courseSearchTerm) => set({ courseSearchTerm }),
}));
