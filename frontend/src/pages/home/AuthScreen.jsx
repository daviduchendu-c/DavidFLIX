import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import Logo from "../../components/Logo";
import ThemeToggle from "../../components/ThemeToggle";

const FEATURES = [
	{
		eyebrow: "01 · Search",
		title: "Search movies, shows and people",
		body: "Look up a film, a series or an actor. Results come straight from TMDB, with posters and release details.",
		art: <SearchMock />,
	},
	{
		eyebrow: "02 · History",
		title: "Your searches, kept for you",
		body: "Every search is saved to your profile, so the title you looked up last week is one click away. Remove anything you don't need.",
		art: <HistoryMock />,
	},
	{
		eyebrow: "03 · Anywhere",
		title: "Trailers on any screen",
		body: "DavidFLIX runs in the browser on your phone, tablet, laptop and TV. Sign in once and pick up where you left off.",
		art: <img src='/illustrations/devices.svg' alt='DavidFLIX on a laptop, tablet and phone' className='w-full' />,
	},
];

const AuthScreen = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		navigate("/signup?email=" + encodeURIComponent(email));
	};

	return (
		<div className='bg-surface-page text-ink-strong'>
			{/* hero */}
			<div className='grid-field border-b border-line-subtle'>
				<header className='mx-auto flex max-w-layout items-center justify-between px-4 py-4 md:px-8'>
					<Logo size='lg' />
					<div className='flex items-center gap-2'>
						<ThemeToggle />
						<Link to={"/login"} className='btn-ghost btn-sm'>
							Sign in
						</Link>
					</div>
				</header>

				<div className='mx-auto grid max-w-layout grid-cols-1 items-center gap-12 px-4 pb-24 pt-16 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:pb-32 lg:pt-24'>
					<div>
						<p className='eyebrow mb-6'>Movies · TV shows · Trailers</p>
						<h1 className='font-expanded text-[clamp(38px,6vw,64px)] leading-[1.02] tracking-[-0.02em]'>
							Every trailer. <span className='text-link'>One place.</span>
						</h1>
						<p className='mt-6 max-w-xl text-lg text-ink-body'>
							Browse what's trending in film and TV, watch the trailers, and find something to watch
							tonight. Free to join.
						</p>

						<form className='mt-8 flex max-w-xl flex-col gap-3 sm:flex-row' onSubmit={handleFormSubmit}>
							<label htmlFor='hero-email' className='sr-only'>
								Email address
							</label>
							<input
								id='hero-email'
								type='email'
								required
								placeholder='Email address'
								className='field flex-1'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<button className='btn-primary btn-lg'>
								Get started
								<Icon name='arrow_forward' size={20} />
							</button>
						</form>
						<p className='mt-3 text-sm text-ink-faint'>
							Already have an account?{" "}
							<Link to='/login' className='font-semibold text-link hover:text-link-hover'>
								Sign in
							</Link>
						</p>
					</div>

					<img
						src='/illustrations/screen.svg'
						alt='DavidFLIX home screen on a TV'
						className='hidden w-full lg:block'
					/>
				</div>
			</div>

			{/* features */}
			<div className='mx-auto flex max-w-layout flex-col gap-24 px-4 py-24 md:px-8 lg:gap-32 lg:py-32'>
				{FEATURES.map((feature, i) => (
					<section
						key={feature.eyebrow}
						className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
					>
						<div>
							<p className='eyebrow mb-4'>{feature.eyebrow}</p>
							<h2 className='font-expanded text-[clamp(26px,3.4vw,38px)]'>{feature.title}</h2>
							<p className='mt-4 max-w-lg text-lg text-ink-body'>{feature.body}</p>
						</div>
						<div>{feature.art}</div>
					</section>
				))}
			</div>

			{/* closing call to action */}
			<div className='border-t border-line-subtle bg-surface-card'>
				<div className='mx-auto flex max-w-layout flex-col items-start justify-between gap-6 px-4 py-16 md:flex-row md:items-center md:px-8'>
					<div>
						<h2 className='font-expanded text-[clamp(26px,3.4vw,38px)]'>Ready to watch?</h2>
						<p className='mt-2 text-ink-body'>Create an account in under a minute.</p>
					</div>
					<Link to='/signup' className='btn-primary btn-lg'>
						Create account
						<Icon name='arrow_forward' size={20} />
					</Link>
				</div>
			</div>
		</div>
	);
};

function SearchMock() {
	return (
		<div className='card p-6' aria-hidden='true'>
			<div className='mb-5 flex gap-5 border-b border-line-subtle text-sm'>
				<span className='tab tab-active'>Movies</span>
				<span className='tab'>TV shows</span>
				<span className='tab'>People</span>
			</div>
			<div className='flex items-center gap-2 rounded-md border border-azure bg-surface-sunken px-3.5 py-3'>
				<Icon name='search' size={20} className='text-ink-faint' />
				<span className='text-ink-strong'>night drive</span>
				<span className='ml-0.5 h-5 w-px animate-pulse bg-azure' />
			</div>
			<div className='mt-5 grid grid-cols-3 gap-3'>
				{["#123A5C", "#1D6D8F", "#123A5C"].map((fill, i) => (
					<div key={i}>
						<div className='flex aspect-[2/3] items-center justify-center rounded-sm' style={{ background: fill }}>
							<Icon name='play_arrow' size={28} className={i === 1 ? "text-link-tint" : "text-ink-faint"} />
						</div>
						<div className='mt-2 h-2.5 w-4/5 rounded-full bg-surface-raised' />
					</div>
				))}
			</div>
		</div>
	);
}

function HistoryMock() {
	const rows = [
		{ avatar: "/avatar1.svg", title: "Night Drive", type: "Movie", date: "Oct 21, 2026" },
		{ avatar: "/avatar2.svg", title: "The Long Shift", type: "TV", date: "Oct 19, 2026" },
		{ avatar: "/avatar3.svg", title: "Ada Okafor", type: "Person", date: "Oct 14, 2026" },
	];
	return (
		<div className='card divide-y divide-line-subtle' aria-hidden='true'>
			{rows.map((row) => (
				<div key={row.title} className='flex items-center gap-4 p-4'>
					<img src={row.avatar} alt='' className='size-12 rounded-md' />
					<div className='min-w-0 flex-1'>
						<p className='truncate font-semibold text-ink-strong'>{row.title}</p>
						<p className='text-sm text-ink-faint'>{row.date}</p>
					</div>
					<span className='badge'>{row.type}</span>
					<Icon name='delete' size={20} className='text-ink-faint' />
				</div>
			))}
		</div>
	);
}

export default AuthScreen;
