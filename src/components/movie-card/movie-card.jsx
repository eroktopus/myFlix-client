import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onAddToFavorites }) => {
  const handleOpenMovieDetails = () => {
    // Perform the action to open the details of the movie
  };

  // Convert Director array to string if it's an array
  const director = Array.isArray(movie.Director) ? movie.Director.join(", ") : movie.Director;
  const genre = Array.isArray(movie.Genre) ? movie.Genre.join(", ") : movie.Genre;

  return (
    <Link to={`/movies/${encodeURIComponent(movie.Title)}`} className="text-decoration-none">
      <Card className="h-100 border-0"> {/* Added border-0 class to remove border */}
        <Card.Img variant="top" src={movie.imageurl} />
        <Card.Body>
          <Card.Title className="text-dark">{movie.Title}</Card.Title> {/* Added text-dark class */}
          <Card.Text className="text-dark">{director}</Card.Text> {/* Added text-dark class */}
          {/* <Button variant="primary" onClick={handleAddToFavorites}>Add to Favorites</Button> */}
        </Card.Body>
      </Card>
    </Link>
  );
};
  

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imageurl: PropTypes.string.isRequired,
    Director: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string) // Allow Director to be an array
    ]).isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired, // Function to handle adding to favorites
};
