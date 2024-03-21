// Movie View Component
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { title } = useParams(); // Get the title parameter from the URL

  // Find the movie by matching its title
  const movie = movies.find((b) => b.Title === decodeURIComponent(title));

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ marginTop: '10px' }}>
        <img src={movie.imageurl} alt={movie.Title} />
      </div>
      <div style={{ marginTop: '20px' }}>
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
      <div style={{ marginTop: '10px' }}>
        <Link to={`/`} className="back-link">
          <button className="back-button btn btn-primary">Back</button>
        </Link>
      </div>
    </div>
  );
  }  
  
