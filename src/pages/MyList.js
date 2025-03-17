import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';

const MyList = () => {
    const { user } = useContext(AuthContext);
    const [myList, setMyList] = React.useState([]);

    React.useEffect(() => {
        if (user) {
            // Fetch user's saved movies from an API or local storage
            const fetchMyList = async () => {
                // Replace with actual API call
                const response = await fetch(`/api/mylist?userId=${user.id}`);
                const data = await response.json();
                setMyList(data);
            };
            fetchMyList();
        }
    }, [user]);

    return (
        <div className="my-list">
            <h2>My List</h2>
            <div className="my-list-content">
                {myList.length > 0 ? (
                    myList.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>No movies in your list.</p>
                )}
            </div>
        </div>
    );
};

export default MyList;