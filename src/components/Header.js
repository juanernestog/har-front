import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavUser from './NavUser';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          Harvestify
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/create" className="nav-link"></Link>
          </Nav>
          <NavUser />
        </Navbar.Collapse>
      </Container>
      <Nav.Item>
        <Nav.Link as={Link} to="/">
          Inicio
        </Nav.Link>
      </Nav.Item>
      <Link to="/signup" className="nav-link">
        Nosotros
      </Link>
      <Link to="/signin" className="nav-link">
        Contactenos
      </Link>
      {/* <Nav.Item>
        <Nav.Link as={Link} to="/">
          <i className="fas fa-search" />
        </Nav.Link>
      </Nav.Item> */}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      </Form>
    </Navbar>
  );
}
