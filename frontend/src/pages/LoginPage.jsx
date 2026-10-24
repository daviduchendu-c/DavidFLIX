import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import AuthLayout from "../components/AuthLayout";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoggingIn } = useAuthStore();

	const handleLogin = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<AuthLayout
			eyebrow='Welcome back'
			title='Sign in'
			footer={
				<>
					New to DavidFLIX?{" "}
					<Link to={"/signup"} className='font-semibold text-azure hover:text-azure-tint'>
						Create an account
					</Link>
				</>
			}
		>
			<form className='space-y-5' onSubmit={handleLogin}>
				<div>
					<label htmlFor='email' className='field-label'>
						Email
					</label>
					<input
						type='email'
						className='field'
						placeholder='you@example.com'
						id='email'
						autoComplete='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor='password' className='field-label'>
						Password
					</label>
					<input
						type='password'
						className='field'
						placeholder='••••••••'
						id='password'
						autoComplete='current-password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button className='btn-primary w-full' disabled={isLoggingIn}>
					{isLoggingIn ? "Signing in…" : "Sign in"}
				</button>
			</form>
		</AuthLayout>
	);
};
export default LoginPage;
