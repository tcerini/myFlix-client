import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Col, Container, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export const ProfileView = ({ user, token, setUser, movies, onLogout }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday); 

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            BirthDate: birthday,
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

    // const handleSubmit = (event) => {
    //     // this prevents the default behavior of the form which is to reload the entire page
    //     event.preventDefault();
    
    //     const data = {
    //       Username: username,
    //       Password: password,
    //       Email: email,
    //       Birthday: birthday
    //     };
    
    //     fetch("https://tc-movie-api.herokuapp.com/users/${user.Username}", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(data)
    //     }).then((response) => response.json())
    //       .then((data) => {
    //         console.log("Login response: ", data);
    //         if (data.user) {
    //           localStorage.setItem("user", JSON.stringify(data.user));
    //           localStorage.setItem("token", data.token);
    //           onLoggedIn(data.user, data.token);
    //         } else {
    //           alert("TBC");
    //         }
    //       })
    //       .catch((e) => {
    //         alert("Something went wrong");
    //       });
    // };

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
                    <Col className='mt-2'>
                    <Card.Text> 
                        Favourite Movies: {user.FavouriteMovies}
                    </Card.Text>
                    </Col>
                </div>
            </Container>
        </>         
    )
}