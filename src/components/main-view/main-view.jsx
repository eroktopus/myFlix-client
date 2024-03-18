import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={6}>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          movies.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : (
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
              />
            </Col>
          )
        ) : movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-4" key={movie.id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
      {user && (
        <Row className="justify-content-end">
          <Col md={4}>
            <Button
              style={{ backgroundColor: "dodgerblue", color: "white" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};


  












