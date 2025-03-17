import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { getMyList } from '../services/auth';
import MovieCard from '../components/MovieCard';
import '../assets/styles/MyList.css';

function MyList() {
  const [myList, setMyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyList() {
      if (currentUser) {
        try {
          const list = await getMyList(currentUser.uid);
          setMyList(list);
        } catch (error) {
          console.error("Error fetching my list:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchMyList();
  }, [currentUser]);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="myList">
      <Header />
      
      <div className="myList__container">
        <h1 className="myList__title">My List</h1>
        
        {isLoading ? (
          <div className="myList__loading">Loading...</div>
        ) : myList.length === 0 ? (
          <div className="myList__empty">
            <p>Your list is empty.</p>
            <p>Add movies and TV shows to your list to watch them later.</p>
            <button 
              className="myList__browseButton"
              onClick={() => navigate('/browse')}
            >
              Browse Content
            </button>
          </div>
        ) : (
          <div className="myList__grid">
            {myList.map(movie => (
              <MovieCard 
                key={movie.id}
                movie={movie}
                isLargeRow={true}
                onClick={() => handleMovieClick(movie)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyList;