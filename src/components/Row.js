import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import '../assets/styles/Row.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const rowRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
        return response;
      } catch (error) {
        console.error(`Error fetching ${title} movies:`, error);
      }
    }
    
    fetchData();
  }, [fetchUrl, title]);

  const handleScroll = () => {
    const row = rowRef.current;
    if (row) {
      setShowLeftArrow(row.scrollLeft > 0);
      setShowRightArrow(row.scrollLeft < row.scrollWidth - row.clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft -= rowRef.current.clientWidth - 100;
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft += rowRef.current.clientWidth - 100;
    }
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      
      <div className="row__container">
        {showLeftArrow && (
          <button className="row__arrow row__arrowLeft" onClick={scrollLeft}>
            <FaChevronLeft />
          </button>
        )}
        
        <div 
          className="row__movies" 
          ref={rowRef} 
          onScroll={handleScroll}
        >
          {movies.map(movie => (
            movie.poster_path && (
              <MovieCard 
                key={movie.id}
                movie={movie}
                isLargeRow={isLargeRow}
                onClick={() => handleMovieClick(movie)}
              />
            )
          ))}
        </div>
        
        {showRightArrow && (
          <button className="row__arrow row__arrowRight" onClick={scrollRight}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default Row;