// Movie Card Component
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
  // Convert Director array to string if it's an array
  const director = Array.isArray(movie.Director) ? movie.Director.join(", ") : movie.Director;

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.imageurl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{director}</Card.Text> {/* Use the director variable here */}
        <Link to={`/movies/${encodeURIComponent(movie.Title)}`}> {/* Pass movie.Title */}
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
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
};
