import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
	const { id } = useParams();
	const [trailers, setTrailers] = useState([]);
	const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState({});
	const [similarContent, setSimilarContent] = useState([]);
	const { contentType } = useContentStore();

	const sliderRef = useRef(null);

	useEffect(() => {
		const getTrailers = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
				setTrailers(res.data.trailers.filter((t) => t.site === "YouTube"));
			} catch (error) {
				setTrailers([]);
			}
		};

		setCurrentTrailerIdx(0);
		getTrailers();
	}, [contentType, id]);

	useEffect(() => {
		const getSimilarContent = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
				setSimilarContent(res.data.similar);
			} catch (error) {
				setSimilarContent([]);
			}
		};

		getSimilarContent();
	}, [contentType, id]);

	useEffect(() => {
		const getContentDetails = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
				setContent(res.data.content);
			} catch (error) {
				setContent(null);
			} finally {
				setLoading(false);
			}
		};

		getContentDetails();
	}, [contentType, id]);

	const handleNext = () => {
		if (currentTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailerIdx + 1);
	};
	const handlePrev = () => {
		if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
	};

	const scrollBy = (direction) => {
		sliderRef.current?.scrollBy({ left: direction * sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	if (loading)
		return (
			<div className='min-h-screen bg-surface-page'>
				<Navbar />
				<div className='px-4 py-8 md:px-8'>
					<WatchPageSkeleton />
				</div>
			</div>
		);

	if (!content) {
		return (
			<div className='min-h-screen bg-surface-page text-ink-strong'>
				<Navbar />
				<div className='mx-auto max-w-layout px-4 py-32 md:px-8'>
					<p className='eyebrow mb-4'>Not found</p>
					<h2 className='font-expanded text-[clamp(26px,3.4vw,38px)]'>We couldn't find this title.</h2>
					<p className='mt-3 text-ink-body'>It may have been removed from TMDB. Try searching for it instead.</p>
					<Link to='/search' className='btn-primary mt-8'>
						<Icon name='search' size={20} />
						Search titles
					</Link>
				</div>
			</div>
		);
	}

	const title = content.title || content.name;
	const releaseDate = content.release_date || content.first_air_date;

	return (
		<div className='min-h-screen bg-surface-page text-ink-strong'>
			<Navbar />

			<div className='mx-auto max-w-layout px-4 py-8 md:px-8'>
				{/* trailer */}
				<div className='overflow-hidden rounded-lg border border-line-subtle bg-surface-sunken shadow-lg'>
					{trailers.length > 0 ? (
						<div className='aspect-video'>
							<ReactPlayer
								controls={true}
								width='100%'
								height='100%'
								url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
							/>
						</div>
					) : (
						<div className='flex aspect-video flex-col items-center justify-center gap-3 p-8 text-center'>
							<Icon name='videocam_off' size={40} className='text-ink-faint' />
							<p className='text-lg text-ink-body'>
								No trailers available for <span className='font-bold text-ink-strong'>{title}</span>.
							</p>
						</div>
					)}
				</div>

				{trailers.length > 1 && (
					<div className='mt-4 flex items-center justify-between gap-4'>
						<button
							className='btn-ghost btn-sm'
							disabled={currentTrailerIdx === 0}
							onClick={handlePrev}
						>
							<Icon name='chevron_left' size={20} />
							Previous
						</button>
						<p className='truncate text-sm text-ink-faint'>
							{currentTrailerIdx + 1} of {trailers.length} · {trailers[currentTrailerIdx].name}
						</p>
						<button
							className='btn-ghost btn-sm'
							disabled={currentTrailerIdx === trailers.length - 1}
							onClick={handleNext}
						>
							Next
							<Icon name='chevron_right' size={20} />
						</button>
					</div>
				)}

				{/* details */}
				<div className='mt-16 grid items-start gap-12 md:grid-cols-[1fr_auto]'>
					<div className='max-w-2xl'>
						<p className='eyebrow mb-4'>{contentType === "movie" ? "Movie" : "TV show"}</p>
						<h2 className='font-expanded text-[clamp(32px,5vw,52px)] leading-[1.05] text-balance'>{title}</h2>

						<div className='mt-4 flex flex-wrap items-center gap-3 text-ink-body'>
							{releaseDate && <span className='font-semibold'>{formatReleaseDate(releaseDate)}</span>}
							<span className='badge'>{content.adult ? "18+" : "PG-13"}</span>
							{content.vote_average > 0 && (
								<span className='flex items-center gap-1 font-semibold'>
									<Icon name='star' size={18} className='text-azure' />
									{content.vote_average.toFixed(1)}
								</span>
							)}
						</div>
						{content.genres?.length > 0 && (
							<div className='mt-4 flex flex-wrap gap-2'>
								{content.genres.map((genre) => (
									<span key={genre.id} className='badge'>
										{genre.name}
									</span>
								))}
							</div>
						)}
						<p className='mt-6 text-lg text-ink-body'>{content.overview}</p>
					</div>
					{content.poster_path && (
						<img
							src={ORIGINAL_IMG_BASE_URL + content.poster_path}
							alt={`${title} poster`}
							className='mx-auto max-h-[520px] rounded-lg border border-line-subtle shadow-lg'
						/>
					)}
				</div>

				{/* similar */}
				{similarContent.length > 0 && (
					<section className='group relative mt-24'>
						<h3 className='mb-6 text-2xl'>More like {title}</h3>

						<div className='flex gap-4 overflow-x-scroll pb-4 scrollbar-hide' ref={sliderRef}>
							{similarContent.map((item) => {
								if (!item.poster_path) return null;
								return (
									<Link key={item.id} to={`/watch/${item.id}`} className='group/card w-44 flex-none md:w-52'>
										<div className='overflow-hidden rounded-md border border-line-subtle'>
											<img
												src={SMALL_IMG_BASE_URL + item.poster_path}
												alt={item.title || item.name}
												loading='lazy'
												className='aspect-[2/3] w-full object-cover transition-transform duration-slow ease-out group-hover/card:scale-105'
											/>
										</div>
										<h4 className='mt-2 truncate font-semibold text-ink-body group-hover/card:text-ink-strong'>
											{item.title || item.name}
										</h4>
									</Link>
								);
							})}
						</div>

						<button
							className='btn-icon absolute left-2 top-1/2 bg-surface-raised opacity-0 shadow-md group-hover:opacity-100'
							onClick={() => scrollBy(-1)}
							aria-label='Scroll left'
						>
							<Icon name='chevron_left' />
						</button>
						<button
							className='btn-icon absolute right-2 top-1/2 bg-surface-raised opacity-0 shadow-md group-hover:opacity-100'
							onClick={() => scrollBy(1)}
							aria-label='Scroll right'
						>
							<Icon name='chevron_right' />
						</button>
					</section>
				)}
			</div>
		</div>
	);
};
export default WatchPage;
