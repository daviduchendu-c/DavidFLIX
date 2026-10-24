import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import Icon from "./Icon";

const MovieSlider = ({ category }) => {
	const { contentType } = useContentStore();
	const [content, setContent] = useState([]);
	const [showArrows, setShowArrows] = useState(false);

	const sliderRef = useRef(null);

	const categoryName = category.replaceAll("_", " ");
	const formattedCategoryName = categoryName[0].toUpperCase() + categoryName.slice(1);
	const formattedContentType = contentType === "movie" ? "movies" : "TV shows";

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

	if (content.length === 0) return null;

	return (
		<section
			className='relative mx-auto w-full max-w-layout px-4 md:px-8'
			onMouseEnter={() => setShowArrows(true)}
			onMouseLeave={() => setShowArrows(false)}
		>
			<h2 className='mb-4 text-xl text-ink-strong md:text-2xl'>
				{formattedCategoryName} {formattedContentType}
			</h2>

			<div className='flex gap-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
				{content.map((item) => {
					if (!item.backdrop_path) return null;
					return (
						<Link to={`/watch/${item.id}`} className='group min-w-[220px] md:min-w-[260px]' key={item.id}>
							<div className='overflow-hidden rounded-md border border-line-subtle bg-surface-card'>
								<img
									src={SMALL_IMG_BASE_URL + item.backdrop_path}
									alt={item.title || item.name}
									loading='lazy'
									className='aspect-video w-full object-cover transition-transform duration-slow ease-out group-hover:scale-105'
								/>
							</div>
							<p className='mt-2 truncate text-sm font-semibold text-ink-body transition-colors duration-fast group-hover:text-ink-strong'>
								{item.title || item.name}
							</p>
						</Link>
					);
				})}
			</div>

			{showArrows && (
				<>
					<button
						className='btn-icon absolute left-6 top-[42%] z-10 -translate-y-1/2 bg-surface-raised shadow-md md:left-10'
						onClick={() => scrollBy(-1)}
						aria-label='Scroll left'
					>
						<Icon name='chevron_left' />
					</button>
					<button
						className='btn-icon absolute right-6 top-[42%] z-10 -translate-y-1/2 bg-surface-raised shadow-md md:right-10'
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
export default MovieSlider;
