import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Icon from "../components/Icon";
import ThemeToggle from "../components/ThemeToggle";

const NotFoundPage = () => {
	return (
		<div className='grid-field flex min-h-screen flex-col bg-surface-page text-ink-strong'>
			<header className='mx-auto flex w-full max-w-layout items-center justify-between px-4 py-4 md:px-8'>
				<Logo size='lg' />
				<ThemeToggle />
			</header>
			<main className='mx-auto flex w-full max-w-layout flex-1 flex-col justify-center px-4 py-24 md:px-8'>
				<p className='eyebrow mb-4'>Error 404</p>
				<h1 className='font-expanded text-[clamp(38px,6vw,64px)] leading-[1.02] tracking-[-0.02em]'>
					This page isn't showing.
				</h1>
				<p className='mt-4 max-w-xl text-lg text-ink-body'>
					The link may be broken or the page may have moved. Head back to the home screen to keep browsing.
				</p>
				<div className='mt-8'>
					<Link to={"/"} className='btn-primary btn-lg'>
						<Icon name='home' />
						Back to home
					</Link>
				</div>
			</main>
		</div>
	);
};
export default NotFoundPage;
