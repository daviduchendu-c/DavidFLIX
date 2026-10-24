import User from '../model/user.model.js';
import { fetchfromTMDB } from '../services/tmdb.service.js';

// Search one TMDB index and record the top hit in the user's search history.
async function searchAndRecord(req, res, { type, imageKey, titleKey }) {
    const query = encodeURIComponent(req.params.query);
    try {
        const response = await fetchfromTMDB(
            `https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        const top = response.results[0];
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: top.id,
                    image: top[imageKey],
                    title: top[titleKey],
                    searchType: type,
                    createdAt: new Date(),
                },
            },
        });

        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error(`Error occurred while searching ${type}:`, error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export function searchPerson(req, res) {
    return searchAndRecord(req, res, { type: "person", imageKey: "profile_path", titleKey: "name" });
}

export function searchMovie(req, res) {
    return searchAndRecord(req, res, { type: "movie", imageKey: "poster_path", titleKey: "title" });
}

export function searchTv(req, res) {
    return searchAndRecord(req, res, { type: "tv", imageKey: "poster_path", titleKey: "name" });
}

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function removeItemFromSearchHistory(req, res) {
    const id = parseInt(req.params.id);
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            },
        });
        res.status(200).json({ success: true, message: "Item removed from search history" });
    } catch (error) {
        console.error('Error occurred while removing search history item:', error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
