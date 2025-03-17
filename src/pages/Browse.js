import React, { useEffect, useState } from 'react';
import Row from '../components/Row';
import requests from '../services/requests';

const Browse = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(requests.fetchTrending);
            const data = await response.json();
            setMovies(data.results);
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Browse Movies</h1>
            <Row title="Trending Now" movies={movies} />
            {/* Additional rows can be added here for different categories */}
        </div>
    );
};

export default Browse;