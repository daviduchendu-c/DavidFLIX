import { useThemeStore } from "../store/theme";
import Icon from "./Icon";

const ThemeToggle = () => {
	const { theme, toggleTheme } = useThemeStore();
	const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

	return (
		<button className='btn-icon border-transparent' onClick={toggleTheme} aria-label={label} title={label}>
			<Icon name={theme === "dark" ? "light_mode" : "dark_mode"} />
		</button>
	);
};
export default ThemeToggle;
