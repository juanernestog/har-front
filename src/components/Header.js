import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavUser from './NavUser';

export default function Header() {
  return (
    <header className="header">
      <Navbar bg="dark" variant="dark" expand="md">
        <Container className="align-middle">
          <Navbar.Brand as={Link} to="/">
            Harvestify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="basic-navbar-nav justify-content-between">
            <Nav className="me-auto">
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
    </header>
  );
}
