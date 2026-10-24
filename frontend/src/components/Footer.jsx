import Icon from "./Icon";

const GITHUB_URL = "https://github.com/daviduchendu-c";
const PORTFOLIO_URL = "https://daviduchendu.vercel.app";

// Material Symbols has no brand marks, so GitHub's mark is drawn inline as a filled glyph.
const GitHubMark = () => (
	<svg viewBox='0 0 16 16' className='size-5' fill='currentColor' aria-hidden='true'>
		<path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' />
	</svg>
);

const Footer = () => {
	return (
		<footer className='border-t border-line-subtle bg-surface-sunken text-ink-body'>
			<div className='mx-auto grid max-w-layout gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr] md:px-8'>
				<div>
					<div className='flex items-center gap-3'>
						<img src='/logo-mark.svg' alt='' className='size-8' />
						<img src='/logo-light.svg' alt='DavidFLIX' className='h-4 dark:hidden' />
						<img src='/logo.svg' alt='DavidFLIX' className='hidden h-4 dark:block' />
					</div>
					<p className='mt-4 max-w-md text-sm'>
						Designed and built by David Uchendu. Trailers, trending titles and search, on the IWD LABS
						design system.
					</p>
				</div>

				<div className='flex flex-col gap-3 md:items-end'>
					<p className='eyebrow'>Find me online</p>
					<div className='flex flex-wrap gap-3'>
						<a href={GITHUB_URL} target='_blank' rel='noreferrer' className='btn-ghost btn-sm'>
							<GitHubMark />
							GitHub
						</a>
						<a href={PORTFOLIO_URL} target='_blank' rel='noreferrer' className='btn-primary btn-sm'>
							<Icon name='person' size={18} />
							Portfolio
						</a>
					</div>
				</div>
			</div>

			<div className='border-t border-line-subtle'>
				<div className='mx-auto flex max-w-layout flex-col justify-between gap-2 px-4 py-5 text-xs text-ink-faint md:flex-row md:px-8'>
					<p>© {new Date().getFullYear()} David Uchendu</p>
					<p>
						Film and TV data from{" "}
						<a
							href='https://www.themoviedb.org/'
							target='_blank'
							rel='noreferrer'
							className='font-semibold text-link hover:text-link-hover'
						>
							TMDB
						</a>
						. This product uses the TMDB API but is not endorsed or certified by TMDB.
					</p>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
