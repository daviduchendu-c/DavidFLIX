import { fetchfromTMDB } from '../services/tmdb.service.js';

export async function getTrendingTv(req, res) {
    try {
        const response = await fetchfromTMDB(`https://api.themoviedb.org/3/trending/tv/day?language=en-US`);
        const randomShow = response.results[Math.floor(Math.random() * response.results.length)];

        res.json({ success: true, content: randomShow });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({ success: true, trailers: data.results });
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSimilarTvs(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvsByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvCredits(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`);
        res.status(200).json({ success: true, cast: data.cast.slice(0, 15) });
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
