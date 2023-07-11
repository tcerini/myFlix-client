import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
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