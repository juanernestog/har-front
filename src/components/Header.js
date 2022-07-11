import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavUser from './NavUser';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container className="d-inline-block align-middle">
        <Navbar.Brand as={Link} to="/">
          Harvestify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mt-3">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">
              Contactenos
            </Nav.Link>
          </Nav>
          <NavUser />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
