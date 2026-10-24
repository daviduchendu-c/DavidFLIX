import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Icon from "../../components/Icon";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../utils/constants";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";
import { useState } from "react";

const HomeScreen = () => {
	const { trendingContent } = useGetTrendingContent();
	const { contentType } = useContentStore();
	const [imgLoading, setImgLoading] = useState(true);

	if (!trendingContent)
		return (
			<div className='relative h-screen bg-surface-page text-ink-strong'>
				<Navbar />
				<div className='shimmer absolute inset-0 -z-10' />
			</div>
		);

	const year = (trendingContent.release_date || trendingContent.first_air_date || "").split("-")[0];
	const overview = trendingContent.overview || "";

	return (
		<>
			{/* Scoped dark band: key art needs a navy scrim, so this stays dark in both themes. */}
			<div className='iwd-dark relative isolate flex min-h-[88vh] flex-col text-ink-strong'>
				<Navbar />

				{imgLoading && <div className='shimmer absolute inset-0 -z-10' />}

				{/* Key art is content, not decoration — kept full-bleed under a flat navy scrim. */}
				<img
					src={ORIGINAL_IMG_BASE_URL + trendingContent.backdrop_path}
					alt=''
					className='absolute inset-0 -z-20 h-full w-full object-cover'
					onLoad={() => setImgLoading(false)}
				/>
				<div className='scrim absolute inset-0 -z-10 md:right-auto md:w-[62%]' aria-hidden='true' />
				<div className='absolute inset-0 -z-10 bg-navy/30' aria-hidden='true' />

				<div className='mx-auto flex w-full max-w-layout flex-1 flex-col justify-center px-4 py-16 md:px-8'>
					<div className='max-w-2xl'>
						<p className='eyebrow mb-4'>Trending today · {contentType === "movie" ? "Movie" : "TV"}</p>
						<h1 className='font-expanded text-[clamp(38px,6vw,64px)] leading-[1.02] tracking-[-0.02em] text-balance'>
							{trendingContent.title || trendingContent.name}
						</h1>
						<div className='mt-4 flex items-center gap-3 text-ink-body'>
							{year && <span className='font-semibold'>{year}</span>}
							<span className='badge'>{trendingContent.adult ? "18+" : "PG-13"}</span>
							{trendingContent.vote_average > 0 && (
								<span className='flex items-center gap-1 font-semibold'>
									<Icon name='star' size={18} className='text-link' />
									{trendingContent.vote_average.toFixed(1)}
								</span>
							)}
						</div>

						<p className='mt-4 text-lg text-ink-body'>
							{overview.length > 200 ? overview.slice(0, 200) + "…" : overview}
						</p>
					</div>

					<div className='mt-8 flex flex-wrap gap-3'>
						<Link to={`/watch/${trendingContent.id}`} className='btn-primary btn-lg'>
							<Icon name='play_arrow' />
							Play trailer
						</Link>
						<Link to={`/watch/${trendingContent.id}`} className='btn-ghost btn-lg bg-navy/40'>
							<Icon name='info' />
							More info
						</Link>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-12 bg-surface-page py-12'>
				{(contentType === "movie" ? MOVIE_CATEGORIES : TV_CATEGORIES).map((category) => (
					<MovieSlider key={category} category={category} />
				))}
			</div>
		</>
	);
};
export default HomeScreen;
