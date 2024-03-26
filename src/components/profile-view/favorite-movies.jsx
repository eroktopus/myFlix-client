import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ user, favoriteMovies, removeFav }) => {
  console.log(favoriteMovies);
  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovies.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movie.ImagePath} alt={movie.Title} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <button variant="secondary" onClick={() => removeFav(movies._id)}>
              Remove from list
            </button>
          </div>
        );
      })}
    </div>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  removeFav: PropTypes.func.isRequired,
};
