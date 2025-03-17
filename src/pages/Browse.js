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
            <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </div>
    );
};

export default Browse;
