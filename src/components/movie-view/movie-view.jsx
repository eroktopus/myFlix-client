// Movie View Component
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { title } = useParams(); // Get the title parameter from the URL

  // Find the movie by matching its title
  const movie = movies.find((b) => b.Title === decodeURIComponent(title));

  // Check if movie exists before accessing its properties
  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div>
      <div>
        <img src={movie.imageurl} alt={movie.Title} />
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
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
