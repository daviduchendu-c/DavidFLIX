import tailwindScrollbarHide from "tailwind-scrollbar-hide";

// Theme values point at the IWD LABS tokens in src/styles/tokens, so the
// design system stays the single source of truth. Core brand colours are also
// given as hex so Tailwind opacity modifiers (bg-navy/80) keep working.
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["selector", ".iwd-dark"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				navy: "#082139",
				offwhite: "#EFEFEF",
				azure: {
					DEFAULT: "#2DA0D1",
					tint: "#7FC4E3",
					dim: "#1D6D8F",
					deep: "#17607F",
				},
				alert: {
					DEFAULT: "#BB120F",
					bright: "#D31411",
					dim: "#7E0C0A",
					soft: "#F08A88",
				},
				surface: {
					page: "var(--surface-page)",
					card: "var(--surface-card)",
					raised: "var(--surface-raised)",
					sunken: "var(--surface-sunken)",
				},
				ink: {
					strong: "var(--text-strong)",
					body: "var(--text-body)",
					faint: "var(--text-faint)",
				},
				link: {
					DEFAULT: "var(--text-link)",
					hover: "var(--text-link-hover)",
				},
				interactive: {
					DEFAULT: "var(--interactive)",
					hover: "var(--interactive-hover)",
					on: "var(--text-on-secondary)",
				},
				line: {
					subtle: "var(--border-subtle)",
					DEFAULT: "var(--border-default)",
				},
			},
			fontFamily: {
				sans: ["Anek Bangla", "sans-serif"],
				accent: ["Pacifico", "cursive"],
			},
			borderRadius: {
				sm: "var(--r-sm)",
				md: "var(--r-md)",
				lg: "var(--r-lg)",
				xl: "var(--r-xl)",
			},
			boxShadow: {
				sm: "var(--shadow-sm)",
				md: "var(--shadow-md)",
				lg: "var(--shadow-lg)",
			},
			maxWidth: {
				layout: "var(--layout-max)",
			},
			transitionDuration: {
				fast: "120ms",
				base: "220ms",
				slow: "360ms",
			},
			transitionTimingFunction: {
				standard: "cubic-bezier(0.4,0,0.2,1)",
				out: "cubic-bezier(0,0,0.2,1)",
			},
		},
	},
	plugins: [tailwindScrollbarHide],
};
