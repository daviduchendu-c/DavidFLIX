import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";
import Icon from "./Icon";
import Logo from "./Logo";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();
	const { contentType, setContentType } = useContentStore();
	const { pathname } = useLocation();

	const links = [
		{ label: "Movies", to: "/", active: pathname === "/" && contentType === "movie", onClick: () => setContentType("movie") },
		{ label: "TV shows", to: "/", active: pathname === "/" && contentType === "tv", onClick: () => setContentType("tv") },
		{ label: "Search history", to: "/history", active: pathname === "/history" },
	];

	return (
		<header className='relative z-50 mx-auto flex max-w-layout flex-wrap items-center justify-between px-4 py-4 md:px-8'>
			<div className='flex items-center gap-10'>
				<Logo />

				<nav className='hidden items-center gap-6 sm:flex'>
					{links.map((link) => (
						<Link
							key={link.label}
							to={link.to}
							onClick={link.onClick}
							className={`nav-link ${link.active ? "nav-link-active" : ""}`}
						>
							{link.label}
						</Link>
					))}
				</nav>
			</div>

			<div className='flex items-center gap-1'>
				<Link to='/search' className='btn-icon border-transparent' aria-label='Search'>
					<Icon name='search' />
				</Link>
				<img
					src={user.image}
					alt={user.username}
					title={user.username}
					className='mx-2 size-8 rounded-sm'
					onError={(e) => (e.currentTarget.src = "/avatar1.svg")}
				/>
				<button className='btn-icon border-transparent' onClick={logout} aria-label='Sign out' title='Sign out'>
					<Icon name='logout' />
				</button>
				<button
					className='btn-icon border-transparent sm:hidden'
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					aria-label='Menu'
					aria-expanded={isMobileMenuOpen}
				>
					<Icon name={isMobileMenuOpen ? "close" : "menu"} />
				</button>
			</div>

			{isMobileMenuOpen && (
				<nav className='card mt-4 w-full overflow-hidden sm:hidden'>
					{links.map((link) => (
						<Link
							key={link.label}
							to={link.to}
							onClick={() => {
								link.onClick?.();
								setIsMobileMenuOpen(false);
							}}
							className={`block border-b border-line-subtle px-4 py-3 font-semibold last:border-b-0 hover:bg-surface-raised ${
								link.active ? "text-ink-strong" : "text-ink-body"
							}`}
						>
							{link.label}
						</Link>
					))}
				</nav>
			)}
		</header>
	);
};
export default Navbar;
