import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import Icon from "./Icon";

// `ranked` renders a Top 10 row: posters with large outlined rank numerals.
const MovieSlider = ({ category, ranked = false }) => {
	const { contentType } = useContentStore();
	const [content, setContent] = useState([]);
	const [showArrows, setShowArrows] = useState(false);

	const sliderRef = useRef(null);

	const categoryName = category.replaceAll("_", " ");
	const formattedCategoryName = categoryName[0].toUpperCase() + categoryName.slice(1);
	const formattedContentType = contentType === "movie" ? "movies" : "TV shows";
	const title = ranked ? `Top 10 ${formattedContentType} today` : `${formattedCategoryName} ${formattedContentType}`;

	useEffect(() => {
		const getContent = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${category}`);
				setContent(res.data.content);
			} catch (error) {
				setContent([]);
			}
		};

		getContent();
	}, [contentType, category]);

	const scrollBy = (direction) => {
		sliderRef.current?.scrollBy({ left: direction * sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	const items = ranked
		? content.filter((item) => item.poster_path).slice(0, 10)
		: content.filter((item) => item.backdrop_path);

	if (items.length === 0) return null;

	return (
		<section
			className='relative mx-auto w-full max-w-layout px-4 md:px-8'
			onMouseEnter={() => setShowArrows(true)}
			onMouseLeave={() => setShowArrows(false)}
		>
			<h2 className='mb-4 flex items-center gap-3 text-xl text-ink-strong md:text-2xl'>
				{ranked && <span className='size-2 rounded-full bg-alert' aria-hidden='true' />}
				{title}
			</h2>

			<div className='flex snap-x snap-mandatory gap-4 overflow-x-scroll pb-2 scrollbar-hide' ref={sliderRef}>
				{items.map((item, i) =>
					ranked ? <RankedCard key={item.id} item={item} rank={i + 1} /> : <BackdropCard key={item.id} item={item} />
				)}
			</div>

			{showArrows && (
				<>
					<button
						className='btn-icon absolute left-6 top-[45%] z-10 -translate-y-1/2 bg-surface-raised shadow-md md:left-10'
						onClick={() => scrollBy(-1)}
						aria-label='Scroll left'
					>
						<Icon name='chevron_left' />
					</button>
					<button
						className='btn-icon absolute right-6 top-[45%] z-10 -translate-y-1/2 bg-surface-raised shadow-md md:right-10'
						onClick={() => scrollBy(1)}
						aria-label='Scroll right'
					>
						<Icon name='chevron_right' />
					</button>
				</>
			)}
		</section>
	);
};

const year = (item) => (item.release_date || item.first_air_date || "").split("-")[0];

// Hover card: the still lifts and a flat info bar slides up with rating and year.
function BackdropCard({ item }) {
	return (
		<Link to={`/watch/${item.id}`} className='group w-[220px] shrink-0 snap-start md:w-[260px]'>
			<div className='relative overflow-hidden rounded-md border border-line-subtle bg-surface-card shadow-sm transition duration-base ease-out group-hover:shadow-md'>
				<img
					src={SMALL_IMG_BASE_URL + item.backdrop_path}
					alt={item.title || item.name}
					loading='lazy'
					className='aspect-video w-full object-cover transition-transform duration-slow ease-out group-hover:scale-105'
				/>
				<div className='iwd-dark absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-2 bg-navy/90 px-3 py-2 text-sm transition-transform duration-base ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0'>
					<span className='flex size-7 items-center justify-center rounded-full bg-azure text-navy'>
						<Icon name='play_arrow' size={18} />
					</span>
					{item.vote_average > 0 && (
						<span className='flex items-center gap-0.5 font-semibold text-ink-strong'>
							<Icon name='star' size={16} className='text-azure' />
							{item.vote_average.toFixed(1)}
						</span>
					)}
					<span className='ml-auto text-ink-body'>{year(item)}</span>
				</div>
			</div>
			<p className='mt-2 truncate text-sm font-semibold text-ink-body transition-colors duration-fast group-hover:text-ink-strong'>
				{item.title || item.name}
			</p>
		</Link>
	);
}

function RankedCard({ item, rank }) {
	return (
		<Link
			to={`/watch/${item.id}`}
			className='group flex shrink-0 snap-start items-end'
			aria-label={`Number ${rank}: ${item.title || item.name}`}
		>
			<span
				className='font-expanded -mr-4 select-none text-[120px] font-extrabold leading-[0.8] text-surface-page md:-mr-5 md:text-[150px]'
				style={{ WebkitTextStroke: "3px var(--text-faint)" }}
				aria-hidden='true'
			>
				{rank}
			</span>
			<div className='relative z-10 w-[110px] overflow-hidden rounded-md border border-line-subtle shadow-md transition duration-base ease-out group-hover:-translate-y-1 group-hover:shadow-lg md:w-[130px]'>
				<img
					src={SMALL_IMG_BASE_URL + item.poster_path}
					alt={item.title || item.name}
					loading='lazy'
					className='aspect-[2/3] w-full object-cover'
				/>
				{rank === 1 && (
					<span className='absolute left-2 top-2 rounded-full bg-alert px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-offwhite'>
						#1
					</span>
				)}
			</div>
		</Link>
	);
}

export default MovieSlider;
