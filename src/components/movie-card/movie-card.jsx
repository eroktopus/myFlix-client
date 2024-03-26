import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, onAddToFavorites }) => {
  const handleOpenMovieDetails = () => {
    // Perform the action to open the details of the movie
  };

  // Convert Director array to string if it's an array
  const director = Array.isArray(movie.Director)
    ? movie.Director.join(", ")
    : movie.Director;
  const genre = Array.isArray(movie.Genre)
    ? movie.Genre.join(", ")
    : movie.Genre;

  return (
    <Link
      to={`/movies/${encodeURIComponent(movie.Title)}`}
      className="text-decoration-none"
    >
      <Card
        className="h-100 border-0"
        style={{
          background: "linear-gradient(to top, rgb(131, 139, 131), #f5f5f5)",
        }}
      >
        <Card.Img variant="top" src={movie.imageurl} />
        <Card.Body>
          <Card.Title className="text-dark">{movie.Title}</Card.Title>
          {/* <Card.Text className="text-dark">{director}</Card.Text> */}
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
      PropTypes.arrayOf(PropTypes.string), // Allow Director to be an array
    ]).isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired, // Function to handle adding to favorites
};
