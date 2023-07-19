import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-view.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const MovieView = ({ movies, user, token, updateUser }) => {

    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId);

    const [Favourite, setFavourite] = useState(
      user.FavouriteMovies.includes(movie._id)
    );  

    const addFavourite = () => {
      fetch(
        `https://tc-movie-api.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return false;
          }
        })
        .then((user) => {
          if (user) {
            setFavourite(true);
            updateUser(user);
          }
        })
        .catch((e) => {
          alert(e);
        });
    };

    const removeFavourite = () => {
      fetch(
        `https://tc-movie-api.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return false;
        }
      })

      .then((user) => {
        if (user) {
          setFavourite(false);
          updateUser(user);
        }
      })
      
      .catch((e) => {
        alert(e);
      });
    };

    return (
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <div className="card mx-auto">
          <Card.Img className="movie-img" src={movie.ImagePath} />
        </div>
        <Card.Body>
          <div>
            <span className="info-category">Title: </span>
            <span>{movie.Title}</span>
          </div>
          <div>
            <span className="info-category">Plot: </span>
            <span>{movie.Description}</span>
          </div>
          <div>
            <span className="info-category">Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div>
            <span className="info-category">Genre Description: </span>
            <span>{movie.Genre.Description}</span>
          </div>
          <div>
            <span className="info-category">Director: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div>
            <span className="info-category">Biography: </span>
            <span>{movie.Director.Bio}</span>
          </div>
          <Link to={`/`}>
            <Button>Back</Button>
          </Link>

          {Favourite ? (
                <Button onClick={removeFavourite}>Remove from favourites</Button>
            ) : (
                <Button onClick={addFavourite}>Add to favourites</Button>
          )}

        </Card.Body>
      </Card>
    );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }),
  }).isRequired
};