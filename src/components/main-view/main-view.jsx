import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from '../navigation-bar/navigation-bar.jsx';
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  //updates users state by taking users actions and putting them in setUser and then updating the new information to the users state
  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://tc-movie-api.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data)
      });
  }, [token]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleSearch = (e) => {
    const searchString = e.target.value;
    const filterArray = movies.filter((movie) =>
      movie.Title.includes(searchString)
    );
    setFilteredMovies(filterArray);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        token={token}
        setUser={setUser}
        setToken={setToken}
        handleSearch={handleSearch}
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
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>

            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView 
                      movies={movies} 
                      user={user}
                      token={token}
                      updateUser={updateUser}
                    />
                  </Col>
                )}
              </>
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
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard 
                          movie={movie}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      token={token}
                      setUser={setUser}
                      movies={movies}
                      updateUser={updateUser}
                      onLogout={onLogout}
                    />
                  </Col>
                )}
              </>
            }
          />

        </Routes>
      </Row>
    </BrowserRouter>
  );  
};