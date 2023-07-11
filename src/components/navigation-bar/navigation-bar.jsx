import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, setUser, setToken }) => {

    if (!user) {
        return null;
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    My Flix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    
                    <Nav.Link className='nav-text font-style' href='/'>
                        Home
                    </Nav.Link>

                    <Nav.Link className='nav-text font-style' href='/users'>
                        Profile
                    </Nav.Link>

                    <Nav.Link
                        className='font-style'
                        href='#'
                        onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                        }}
                        >
                        Logout
                    </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};