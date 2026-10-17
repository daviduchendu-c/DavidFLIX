import { fetchfromTMDB } from '../services/tmdb.service.js';

export async function getTrendingMovie(req, res) {
    try {
        const response = await fetchfromTMDB(`https://api.themoviedb.org/3/trending/movie/day`);
    const randomMovie = response.results[Math.floor(Math.random() * response.results.length)];
    
    res.json({ success:true,content : randomMovie});

    } catch (error) {
        res.status(500).json({success: false, message : "Internal Server Error " });
        
    }
};