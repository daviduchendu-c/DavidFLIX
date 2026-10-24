import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import toast from "react-hot-toast";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const TABS = [
	{ value: "movie", label: "Movies", placeholder: "Search for a movie" },
	{ value: "tv", label: "TV shows", placeholder: "Search for a TV show" },
	{ value: "person", label: "People", placeholder: "Search for an actor or director" },
];

const SearchPage = () => {
	const [activeTab, setActiveTab] = useState("movie");
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearching, setIsSearching] = useState(false);

	const [results, setResults] = useState([]);
	const { setContentType } = useContentStore();

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		if (tab !== "person") setContentType(tab);
		setResults([]);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!searchTerm.trim()) return;
		setIsSearching(true);
		try {
			const res = await axios.get(`/api/v1/search/${activeTab}/${encodeURIComponent(searchTerm.trim())}`);
			setResults(res.data.content);
		} catch (error) {
			setResults([]);
			if (error.response?.status === 404) {
				toast.error("Nothing found. Check the spelling or try another category.");
			} else {
				toast.error("Search failed. Try again in a moment.");
			}
		} finally {
			setIsSearching(false);
		}
	};

	const activePlaceholder = TABS.find((t) => t.value === activeTab).placeholder;

	return (
		<div className='min-h-screen bg-surface-page text-ink-strong'>
			<Navbar />
			<div className='mx-auto max-w-layout px-4 py-12 md:px-8'>
				<p className='eyebrow mb-4'>Search</p>
				<h1 className='font-expanded mb-8 text-[clamp(26px,3.4vw,38px)]'>Find something to watch</h1>

				<div className='mb-6 flex gap-6 border-b border-line-subtle' role='tablist'>
					{TABS.map((tab) => (
						<button
							key={tab.value}
							role='tab'
							aria-selected={activeTab === tab.value}
							className={`tab ${activeTab === tab.value ? "tab-active" : ""}`}
							onClick={() => handleTabClick(tab.value)}
						>
							{tab.label}
						</button>
					))}
				</div>

				<form className='mb-12 flex max-w-2xl gap-3' onSubmit={handleSearch}>
					<label htmlFor='search' className='sr-only'>
						{activePlaceholder}
					</label>
					<input
						id='search'
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder={activePlaceholder}
						className='field flex-1'
					/>
					<button className='btn-primary' disabled={isSearching} aria-label='Search'>
						<Icon name='search' size={20} />
						<span className='hidden sm:inline'>{isSearching ? "Searching…" : "Search"}</span>
					</button>
				</form>

				<div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
					{results.map((result) => {
						if (!result.poster_path && !result.profile_path) return null;

						if (activeTab === "person") {
							return (
								<div key={result.id}>
									<img
										src={SMALL_IMG_BASE_URL + result.profile_path}
										alt={result.name}
										loading='lazy'
										className='aspect-[2/3] w-full rounded-md border border-line-subtle object-cover'
									/>
									<h2 className='mt-2 truncate text-base'>{result.name}</h2>
									<p className='text-sm text-ink-faint'>{result.known_for_department}</p>
								</div>
							);
						}

						return (
							<Link
								key={result.id}
								to={"/watch/" + result.id}
								onClick={() => setContentType(activeTab)}
								className='group'
							>
								<div className='overflow-hidden rounded-md border border-line-subtle'>
									<img
										src={SMALL_IMG_BASE_URL + result.poster_path}
										alt={result.title || result.name}
										loading='lazy'
										className='aspect-[2/3] w-full object-cover transition-transform duration-slow ease-out group-hover:scale-105'
									/>
								</div>
								<h2 className='mt-2 truncate text-base text-ink-body group-hover:text-ink-strong'>
									{result.title || result.name}
								</h2>
								<p className='text-sm text-ink-faint'>
									{(result.release_date || result.first_air_date || "").split("-")[0]}
								</p>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default SearchPage;
