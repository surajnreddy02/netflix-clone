import React from 'react';

const MovieCard = ({ title, image, description }) => {
    return (
        <div className="movie-card">
            <img src={image} alt={title} className="movie-card__image" />
            <div className="movie-card__info">
                <h3 className="movie-card__title">{title}</h3>
                <p className="movie-card__description">{description}</p>
            </div>
        </div>
    );
};

export default MovieCard;