import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

function formatDate(dateString) {
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	});
}

const TYPE_LABELS = { movie: "Movie", tv: "TV", person: "Person" };

const SearchHistoryPage = () => {
	const [searchHistory, setSearchHistory] = useState([]);

	useEffect(() => {
		const getSearchHistory = async () => {
			try {
				const res = await axios.get(`/api/v1/search/history`);
				setSearchHistory(res.data.content);
			} catch (error) {
				setSearchHistory([]);
			}
		};
		getSearchHistory();
	}, []);

	const handleDelete = async (entry) => {
		try {
			await axios.delete(`/api/v1/search/history/${entry.id}`);
			setSearchHistory((history) => history.filter((item) => item.id !== entry.id));
		} catch (error) {
			toast.error("Could not remove that search. Try again.");
		}
	};

	return (
		<div className='min-h-screen bg-surface-page text-ink-strong'>
			<Navbar />
			<div className='mx-auto max-w-layout px-4 py-12 md:px-8'>
				<p className='eyebrow mb-4'>Your profile</p>
				<h1 className='font-expanded mb-8 text-[clamp(26px,3.4vw,38px)]'>Search history</h1>

				{searchHistory.length === 0 ? (
					<div className='card flex flex-col items-center gap-4 px-6 py-20 text-center'>
						<Icon name='history' size={40} className='text-ink-faint' />
						<p className='text-lg text-ink-body'>No searches yet. Titles and people you search for will show up here.</p>
						<Link to='/search' className='btn-primary'>
							<Icon name='search' size={20} />
							Start searching
						</Link>
					</div>
				) : (
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{searchHistory.map((entry) => (
							<div key={`${entry.searchType}-${entry.id}-${entry.createdAt}`} className='card-interactive flex items-center gap-4 p-4'>
								<img
									src={entry.image ? SMALL_IMG_BASE_URL + entry.image : "/avatar1.svg"}
									alt=''
									className='size-14 shrink-0 rounded-md object-cover'
								/>
								<div className='min-w-0 flex-1'>
									<p className='truncate font-semibold text-ink-strong'>{entry.title}</p>
									<p className='text-sm text-ink-faint'>{formatDate(entry.createdAt)}</p>
								</div>
								<span className='badge'>{TYPE_LABELS[entry.searchType] || entry.searchType}</span>
								<button
									className='btn-icon shrink-0 border-transparent text-ink-faint hover:bg-alert hover:text-offwhite'
									onClick={() => handleDelete(entry)}
									aria-label={`Remove ${entry.title} from history`}
								>
									<Icon name='delete' size={20} />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
export default SearchHistoryPage;
