import React from 'react';
import './Row.css'; // Assuming you have a CSS file for styling the row
import MovieCard from './MovieCard';

const Row = ({ title, movies }) => {
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Row;