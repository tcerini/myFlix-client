import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export const ProfileView = ({ user, token, setUser, movies, onLogout }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const favoriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie._id)
    });

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
                </div>
            </Container>
        </>         
    )
}