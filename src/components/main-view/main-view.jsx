import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  const handleAddToFavorites = async (movie) => {
    try {
      const response = await fetch('https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/users/${user.Username}/movies/${movie._id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ movieId: movie._id }) 
      });
  
      if (!response.ok) {
        throw new Error('Failed to add movie to favorites');
      }
  
      const updatedFavoriteMovies = await response.json();
     
      console.log('Movie added to favorites:', movie.Title);
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

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

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
         <Route 
            path="/profile" 
            element={<ProfileView token={token} onAddToFavorites={handleAddToFavorites} />} />
      
          <Route
            path="/movies/:title"
            element={
              <div className="pt-4"> {/* Add padding top here */}
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </div>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4 pt-4" key={movie.Title} md={3}> {/* Add padding top here */}
                        <MovieCard
                          movie={movie}
                          onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                          }}
                          onAddToFavorites={handleAddToFavorites} 
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
