import { Link } from "react-router-dom";

// Navbar lockup: 32px badge, 8px gap, wordmark — the same proportions the
// design system uses for its own NavBar logo. Below `sm` only the badge shows.
const Logo = ({ to = "/", size = "md", compact = false }) => {
	const markClass = size === "lg" ? "size-10" : "size-8";
	const wordClass = size === "lg" ? "h-6 sm:h-7" : "h-4 sm:h-5";
	// compact: badge only until `sm`, for headers that also carry icon buttons
	const showAt = compact ? "sm:block" : "min-[380px]:block";
	const showDarkAt = compact ? "dark:sm:block" : "dark:min-[380px]:block";

	return (
		<Link to={to} className='flex shrink-0 items-center gap-2' aria-label='DavidFLIX home'>
			<img src='/logo-mark.svg' alt='' className={markClass} />
			{/* Ink wordmark on light surfaces, off-white wordmark inside any .iwd-dark scope. */}
			<img src='/logo-light.svg' alt='DavidFLIX' className={`${wordClass} hidden w-auto ${showAt} dark:!hidden`} />
			<img src='/logo.svg' alt='DavidFLIX' className={`${wordClass} hidden w-auto ${showDarkAt}`} />
		</Link>
	);
};
export default Logo;
