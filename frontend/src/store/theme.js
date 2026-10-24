import { create } from "zustand";

// Light is the design system's default; dark is its `.iwd-dark` inversion.
// index.html applies the saved theme before first paint to avoid a flash.
const STORAGE_KEY = "davidflix-theme";

const readTheme = () => (document.documentElement.classList.contains("iwd-dark") ? "dark" : "light");

export const useThemeStore = create((set, get) => ({
	theme: readTheme(),
	toggleTheme: () => {
		const theme = get().theme === "dark" ? "light" : "dark";
		document.documentElement.classList.toggle("iwd-dark", theme === "dark");
		document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#082139" : "#EFEFEF");
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {
			// Storage can be blocked (private mode); the toggle still works for this visit.
		}
		set({ theme });
	},
}));
