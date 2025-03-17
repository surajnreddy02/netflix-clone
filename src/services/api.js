import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const fetchTrendingMovies = async () => {
    const response = await api.get('/trending/all/week');
    return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
};

export const fetchMoviesByGenre = async (genreId) => {
    const response = await api.get('/discover/movie', {
        params: {
            with_genres: genreId,
        },
    });
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await api.get('/search/movie', {
        params: {
            query: query,
        },
    });
    return response.data.results;
};