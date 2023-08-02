import { useState } from "react";
import { MovieCard } from '../movie-card/movie-card';
import Button from "react-bootstrap/Button";
import { Col, Container, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

export const ProfileView = ({ user, token, setUser, onLogout, movies, updateUser }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday.slice(0, 10));
   
    const favouriteMovies = movies.filter((movie) => {
        return user.FavouriteMovies.includes(movie._id)
    });


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
            FavouriteMovies: []
        };

        fetch(`https://tc-movie-api.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Update failed.")
            }
        }).then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };

    const removeFavourite = (movieIdToRemove) => {
        fetch(
          `https://tc-movie-api.herokuapp.com/users/${user.Username}/movies/${movieIdToRemove}`,
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
            updateUser(user);
          }
        })
        
        .catch((e) => {
          alert(e);
        });
    };  

    const deleteUser = () => {
        fetch(`https://tc-movie-api.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                onLogout();
            } else {
                alert("Unable to delete user.")
            }
        })
    }

    return (
        <>
            <Container>
                <div className='mx-auto'>
                    <Card.Title className='font-style' id='settings-heading'>
                    Settings
                    </Card.Title>
                    <Col className='mt-2'>
                    <Card.Text>
                        Username: {user.Username}
                    </Card.Text>
                    </Col>
                    <Col className='mt-2'>
                    <Card.Text>
                        Birthday: {user.Birthday.slice(0, 10)}
                    </Card.Text>
                    </Col>
                    <Col className='mt-2'>
                    <Card.Text> 
                        Email: {user.Email}
                    </Card.Text>
                    </Col>
                    <Row>
                        <Card.Text className='mt-2'> 
                            Favourite Movies:
                        </Card.Text>
                            {favouriteMovies.map((movie) => (
                                <Col className='mt-2' key={movie._id} md={4}>
                                    <MovieCard movie={movie} className="shadow p-3 mb-5 bg-white rounded card-aspects"></MovieCard>
                                    <Button movie={movie} onClick={() => {
                                        removeFavourite(movie._id)
                                    }}>
                                        Remove from favourites
                                    </Button>  
                                </Col>
                            ))}
                    </Row> 
                </div>
            </Container>
            <br />        <br />
            <Col>
                <h5>Update user profile:</h5>
                <Form className='font-style' onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="5" 
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="5"
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Save changes</Button>
                    <Button variant="primary" onClick={deleteUser}> Delete my account</Button>
                </Form>
            </Col>
        </>         
    )
}

//define all the prop constraints
ProfileView.propTypes = {
    user: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired
    }).isRequired
};