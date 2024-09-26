import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
    const token = localStorage.getItem('token');  // Check if token exists

    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove token from localStorage
        window.location.href = '/login';  // Redirect to login page
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">All Books</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/authors">All Authors</Nav.Link>
                        <Nav.Link as={Link} to="/add-book">Add Book</Nav.Link>
                        <Nav.Link as={Link} to="/add-author">Add Author</Nav.Link>

                        {/* Conditionally render Logout or Login based on token */}
                        {token ? (
                            <Nav.Link as={Link} onClick={handleLogout}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
