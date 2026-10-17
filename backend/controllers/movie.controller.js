import { fetchfromTMDB } from '../services/tmdb.service.js';

export async function getTrendingMovie(req, res) {
    try {
        const response = await fetchfromTMDB(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`);
    const randomMovie = data.result[Math.floor(Math.random()* data.result?.length)];
    
    res.json({ success:true,content : randomMovie});

    } catch (error) {
        res.status(500).json({success: false, message : error: message });
    }
}