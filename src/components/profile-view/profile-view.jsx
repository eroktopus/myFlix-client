import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './profile-view.scss';
import UserInfo from './user-info';
import UpdateUser from './update-user';
import { MovieCard } from '../movie-card/movie-card';

export function ProfileView ({ token }) {
  const [user, setUser] = useState({
    Username: '',
    Email: '',
  });  

  const handleUpdate = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const [favoriteMovieList, setFavoriteMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
  
    fetchUserData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
      });
      alert('User info updated successfully');
    } catch (error) {
      alert('Failed to update user info');
    }
  };

  return (
    <div>
      <div style={{ paddingTop: '20px' }}>
        <UserInfo name={user.Username} email={user.Email} />
      </div>
      <div style={{ paddingTop: '20px' }}>Favorite Movies</div>
      <div className="movie-card-container">
        {favoriteMovieList.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFavorite={() => handleRemoveFavorite(movie._id)}
          />
        ))}
      </div>
      <div style={{ paddingTop: '20px' }}>
        <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} user={user} />
      </div>
    </div>
  );

}

export default ProfileView;
