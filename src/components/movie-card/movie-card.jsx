import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


// The MovieCard function component 
export const MovieCard = ({ movie }) => {
  return (
    <div className="card-aspects">
      <Card className="shadow p-3 mb-5 bg-white rounded card-aspects">
        <Card.Img variant="top" src={movie.ImagePath} className="moviecard-img"/>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

//define all the prop constraints
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired
};