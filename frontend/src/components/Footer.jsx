const Footer = () => {
	return (
		<footer className='border-t border-line-subtle bg-surface-sunken text-ink-body'>
			<div className='mx-auto flex max-w-layout flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-8'>
				<div className='flex items-center gap-3'>
					<img src='/logo-mark.svg' alt='' className='size-6' />
					<p className='text-sm'>
						DavidFLIX by David Uchendu. Film and TV data from{" "}
						<a
							href='https://www.themoviedb.org/'
							target='_blank'
							rel='noreferrer'
							className='font-semibold text-azure hover:text-azure-tint'
						>
							TMDB
						</a>
						.
					</p>
				</div>
				<p className='text-xs text-ink-faint'>
					This product uses the TMDB API but is not endorsed or certified by TMDB.
				</p>
			</div>
		</footer>
	);
};
export default Footer;
