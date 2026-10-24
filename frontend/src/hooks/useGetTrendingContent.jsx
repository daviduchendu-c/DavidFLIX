import { useCallback, useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const [isShuffling, setIsShuffling] = useState(false);
	const { contentType } = useContentStore();

	// The API returns a random pick from today's trending list, so calling it again shuffles.
	const getTrendingContent = useCallback(async () => {
		try {
			const res = await axios.get(`/api/v1/${contentType}/trending`);
			setTrendingContent(res.data.content);
		} catch (error) {
			setTrendingContent(null);
		}
	}, [contentType]);

	useEffect(() => {
		getTrendingContent();
	}, [getTrendingContent]);

	const shuffle = async () => {
		setIsShuffling(true);
		await getTrendingContent();
		setIsShuffling(false);
	};

	return { trendingContent, shuffle, isShuffling };
};
export default useGetTrendingContent;
