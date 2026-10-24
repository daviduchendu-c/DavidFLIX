import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import AuthLayout from "../components/AuthLayout";

const SignUpPage = () => {
	const { searchParams } = new URL(document.location);
	const emailValue = searchParams.get("email");

	const [email, setEmail] = useState(emailValue || "");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { signup, isSigningUp } = useAuthStore();

	const handleSignUp = (e) => {
		e.preventDefault();
		signup({ email, username, password });
	};

	return (
		<AuthLayout
			eyebrow='Join DavidFLIX'
			title='Create your account'
			footer={
				<>
					Already a member?{" "}
					<Link to={"/login"} className='font-semibold text-azure hover:text-azure-tint'>
						Sign in
					</Link>
				</>
			}
		>
			<form className='space-y-5' onSubmit={handleSignUp}>
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
					<label htmlFor='username' className='field-label'>
						Username
					</label>
					<input
						type='text'
						className='field'
						placeholder='davidu'
						id='username'
						autoComplete='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor='password' className='field-label'>
						Password
					</label>
					<input
						type='password'
						className='field'
						placeholder='At least 6 characters'
						id='password'
						autoComplete='new-password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button className='btn-primary w-full' disabled={isSigningUp}>
					{isSigningUp ? "Creating account…" : "Create account"}
				</button>
			</form>
		</AuthLayout>
	);
};
export default SignUpPage;
