// Filled glyph from Material Symbols Rounded (FILL 1), the design system's icon set.
// `name` is the ligature, e.g. "play_arrow", "search", "logout".
const Icon = ({ name, size = 24, className = "", label }) => {
	return (
		<span
			className={`icon ${className}`}
			style={{ fontSize: size, width: size, height: size }}
			aria-hidden={label ? undefined : true}
			aria-label={label}
			role={label ? "img" : undefined}
		>
			{name}
		</span>
	);
};
export default Icon;
