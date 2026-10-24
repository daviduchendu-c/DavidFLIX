import Logo from "./Logo";

// Shared shell for the sign-in and sign-up pages: dot-field page, one centred card.
const AuthLayout = ({ eyebrow, title, children, footer }) => {
	return (
		<div className='dot-field min-h-screen w-full bg-surface-page'>
			<header className='mx-auto flex max-w-layout items-center justify-between px-4 py-4 md:px-8'>
				<Logo size='lg' />
			</header>

			<div className='mx-4 flex items-center justify-center py-16'>
				<div className='card w-full max-w-md p-8'>
					<p className='eyebrow mb-3'>{eyebrow}</p>
					<h1 className='font-expanded mb-8 text-[clamp(26px,3.4vw,32px)] text-ink-strong'>{title}</h1>
					{children}
					<div className='mt-6 border-t border-line-subtle pt-6 text-center text-ink-body'>{footer}</div>
				</div>
			</div>
		</div>
	);
};
export default AuthLayout;
