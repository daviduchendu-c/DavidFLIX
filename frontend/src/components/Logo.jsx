import { Link } from "react-router-dom";

// Navbar lockup: 32px badge, 8px gap, wordmark — the same proportions the
// design system uses for its own NavBar logo. Below `sm` only the badge shows.
const Logo = ({ to = "/", size = "md" }) => {
	const markClass = size === "lg" ? "size-10" : "size-8";
	const wordClass = size === "lg" ? "h-6 sm:h-7" : "h-4 sm:h-5";

	return (
		<Link to={to} className='flex shrink-0 items-center gap-2' aria-label='DavidFLIX home'>
			<img src='/logo-mark.svg' alt='' className={markClass} />
			<img src='/logo.svg' alt='DavidFLIX' className={`${wordClass} hidden w-auto min-[380px]:block`} />
		</Link>
	);
};
export default Logo;
