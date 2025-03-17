import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addToMyList, removeFromMyList, getMyList } from '../services/auth';
import '../assets/styles/MovieCard.css';
import { FaPlus, FaCheck, FaPlay, FaThumbsUp, FaThumbsDown, FaChevronDown } from 'react-icons/fa';

function MovieCard({ movie, isLargeRow = false, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);
  const { currentUser } = useAuth();
  
  const baseUrl = "https://image.tmdb.org/t/p/original";

  // Check if movie is in user's list when component mounts
  React.useEffect(() => {
    async function checkMyList() {
      if (currentUser) {
        const myList = await getMyList(currentUser.uid);
        setIsInMyList(myList.some(item => item.id === movie.id));
      }
    }
    
    checkMyList();
  }, [currentUser, movie.id]);

  const handleAddToList = async (e) => {
    e.stopPropagation();
    if (currentUser) {
      if (isInMyList) {
        await removeFromMyList(currentUser.uid, movie);
        setIsInMyList(false);
      } else {
        await addToMyList(currentUser.uid, movie);
        setIsInMyList(true);
      }
    }
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div 
      className={`movieCard ${isLargeRow && "movieCard--large"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img
        className={`movieCard__poster ${isLargeRow && "movieCard__posterLarge"}`}
        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path}`}
        alt={movie.name || movie.title}
      />
      
      {isHovered && (
        <div className="movieCard__hover">
          <div className="movieCard__info">
            <div className="movieCard__buttons">
              <button className="movieCard__button movieCard__playButton" onClick={handlePlay}>
                <FaPlay />
              </button>
              <button className="movieCard__button" onClick={handleAddToList}>
                {isInMyList ? <FaCheck /> : <FaPlus />}
              </button>
              <button className="movieCard__button">
                <FaThumbsUp />
              </button>
              <button className="movieCard__button">
                <FaThumbsDown />
              </button>
              <button className="movieCard__button movieCard__moreInfoButton">
                <FaChevronDown />
              </button>
            </div>
            
            <h4 className="movieCard__title">{movie.title || movie.name}</h4>
            
            <div className="movieCard__details">
              <span className="movieCard__rating">{movie.vote_average * 10}% Match</span>
              <span className="movieCard__year">{movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}</span>
            </div>
            
            <div className="movieCard__genres">
              {/* We'd need to fetch genres from API or have them in the movie object */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;