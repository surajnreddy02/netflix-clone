import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './MovieDetail.css'; // Assuming you have a CSS file for styling

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await api.get(`/movies/${id}`); // Ensure this endpoint is correct
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div className="movie-detail">
            <h1>{movie.title}</h1>
            <img src={movie.imageUrl} alt={movie.title} />
            <p>{movie.description}</p>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Rating: {movie.rating}</p>
        </div>
    );
};

export default MovieDetail;
