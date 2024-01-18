import React, { useContext } from 'react';
import { Navbar, Nav, NavItem, Button, Container, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from './AuthContext';
import {useLocation, useNavigate} from "react-router-dom";

function NavBar() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/')
    };

    const location = useLocation();

    return (
        <Navbar bg="light" expand="lg">
            <style type="text/css">
                {`
                    .dropdown-item.active, .dropdown-item:active {
                        background-color: #198754 !important;
                    }
    `           }
            </style>
            <Container fluid>
                <LinkContainer to="/">
                    <Navbar.Brand>MovieApp</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0">
                        <LinkContainer to="/movies">
                            <Nav.Link>Movies</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/add-movie">
                            <Nav.Link>Add Movie</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <NavItem onClick={handleLogout}>
                                <Nav.Link onClick={handleLogout}>
                                    <Button variant="outline-danger">Logout</Button>
                                </Nav.Link>
                            </NavItem>
                        ) : (
                            <DropdownButton
                                id="dropdown-sign-in"
                                variant="outline-success"
                                title="Sign In"
                                className="mt-2"
                                align={{lg: 'end'}}
                            >
                                <Dropdown.Item href="/login"
                                               active={location.pathname === '/login'}>Login</Dropdown.Item>
                                <Dropdown.Item href="/register"
                                               active={location.pathname === '/register'}>Registration</Dropdown.Item>
                                <Dropdown.Item href="/activate"
                                               active={location.pathname === '/activate'}>Activate</Dropdown.Item>
                            </DropdownButton>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
