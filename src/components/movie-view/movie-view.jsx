import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, isFavorite }) => {
  console.log(useParams(), "==movies==", movies);
  const { title } = useParams();

  const movie = movies.find((b) => b.Title === decodeURIComponent(title));

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [addTitle, setAddTitle] = useState("");
  const [delTitle, setDelTitle] = useState("");
  console.log("MovieView User:", user);

  const handleAddToFavorites = () => {
    fetch(
      `https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/users/${
        user.Username
      }/movies/${encodeURIComponent(movie._id)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to favorites.");
        }
        alert("Movie added to favorites successfully!");
        // window.location.reload();
        return response.json();
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveFromFavorites = () => {
    fetch(
      `https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/users/${
        user.Username
      }/movies/${encodeURIComponent(movie._id)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from favorites.");
        }
        alert("Movie removed from favorites successfully!");
        window.location.reload();
        return response.json();
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ marginTop: "10px" }}>
        <img src={movie.imageurl} alt={movie.Title} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <strong>Title: </strong>
        <strong>{movie.Title}</strong>
      </div>

      <div>
        <strong>Director: </strong>
        <span>{movie.Director}</span>
      </div>
      <div>
        <strong>Genre: </strong>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <strong>Description: </strong>
        <span>{movie.description}</span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Link to={`/`} className="favorite-link">
          <button
            className="favorite-button btn btn-primary"
            onClick={handleAddToFavorites}
          >
            Add to Favorites
          </button>
        </Link>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Link to={`/`} className="favorite-link">
          <button
            className="favorite-button btn btn-primary"
            onClick={handleRemoveFromFavorites}
          >
            Remove from Favorites
          </button>
        </Link>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Link to={`/`} className="back-link">
          <button className="back-button btn btn-primary">Back</button>
        </Link>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      imageurl: PropTypes.string.isRequired,
      Genre: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
