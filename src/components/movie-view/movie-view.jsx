import React from "react";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img className="w-100" src={movie.imageurl} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <button
  onClick={onBackClick}
  className="back-button"
  style={{ cursor: "pointer" }}
>
  Back
</button>
    </div>

    
  );
};
