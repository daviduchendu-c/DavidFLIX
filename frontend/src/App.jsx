import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/404";

function App() {
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);

	if (isCheckingAuth) {
		return (
			<div className='flex h-screen items-center justify-center bg-surface-page'>
				<img src='/logo-mark.svg' alt='Loading DavidFLIX' className='size-14 animate-pulse' />
			</div>
		);
	}

	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				<Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
			<Footer />

			<Toaster
				position='bottom-center'
				toastOptions={{
					style: {
						background: "var(--surface-raised)",
						color: "var(--text-strong)",
						border: "1px solid var(--border-default)",
						borderRadius: "var(--r-md)",
						boxShadow: "var(--shadow-md)",
						fontFamily: "var(--font-body)",
						fontWeight: 500,
					},
					success: { iconTheme: { primary: "#2DA0D1", secondary: "#082139" } },
					error: { iconTheme: { primary: "#BB120F", secondary: "#EFEFEF" } },
				}}
			/>
		</>
	);
}

export default App;
