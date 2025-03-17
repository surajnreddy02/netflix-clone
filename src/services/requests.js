import axios from 'axios';
import API_KEY, { BASE_URL } from '../config';

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchMovieDetails: (id) => `/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
    fetchTvDetails: (id) => `/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
    searchMovies: (query) => `/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
};

export const fetchData = async (request) => {
    try {
        const response = await axios.get(`${BASE_URL}${request}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};

export default requests;
