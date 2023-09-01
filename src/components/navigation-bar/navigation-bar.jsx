import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const NavigationBar = ({ user, setUser, setToken, handleSearch }) => {

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

                    <Nav.Link className='nav-text font-style' href='/profile'>
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
                    
                    <Form className="ml-auto">
                        <Form.Control
                            className="mr-sm-2"
                            id="search-bar"
                            type="text"
                            placeholder="Search"
                            onChange={handleSearch}
                        ></Form.Control>
                    </Form>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

NavigationBar.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired
};