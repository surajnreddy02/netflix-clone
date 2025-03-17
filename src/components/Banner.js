import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import requests from '../services/requests';
import '../assets/styles/Banner.css';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

function Banner() {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const results = response.data.results;
        if (results && results.length > 0) {
          // Get a random movie from the results
          const randomIndex = Math.floor(Math.random() * results.length);
          setMovie(results[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    }
    
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handlePlay = () => {
    if (movie) {
      navigate(`/movie/${movie.id}`);
    }
  };

  const handleMoreInfo = () => {
    if (movie) {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <header 
      className="banner" 
      style={{
        backgroundImage: movie ? `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` : 'none',
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        
        <div className="banner__buttons">
          <button className="banner__button banner__buttonPlay" onClick={handlePlay}>
            <FaPlay /> Play
          </button>
          <button className="banner__button" onClick={handleMoreInfo}>
            <FaInfoCircle /> More Info
          </button>
        </div>
        
        <div className="banner__description">
          {truncate(movie?.overview, 150)}
        </div>
      </div>
      
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;