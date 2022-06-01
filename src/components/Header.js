import React from 'react';
import { Container, Nav, Navbar, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavUser from './NavUser';

export default function Header() {
  return (
    <>
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
          </Navbar.Collapse>
        </Container>
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            Inicio
          </Nav.Link>
        </Nav.Item>
        <Link to="/about" className="nav-link">
          Nosotros
        </Link>
        <Link to="/contact" className="nav-link">
          Contactenos
        </Link>
        {/* <Nav.Item>
        <Nav.Link as={Link} to="/">
          <i className="fas fa-search" />
        </Nav.Link>
      </Nav.Item> */}
        <Form>
          <Form.Group className="mb-3" controlId="SearchBar">
            <Form.Label>Busqueda</Form.Label>
            <Form.Control type="product" placeholder="Buscar" />
          </Form.Group>
        </Form>
        <NavUser />
      </Navbar>
    </>
  );
}
