import React from 'react';
import './Banner.css'; // Assuming you have a CSS file for styling

const Banner = ({ title, description, imageUrl }) => {
    return (
        <header className="banner" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="banner__contents">
                <h1 className="banner__title">{title}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{description}</h1>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    );
};

export default Banner;