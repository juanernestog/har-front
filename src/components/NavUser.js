import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';

export default function NavUser() {
  return (
    <Nav className="nav">
      {/* TODO: Swapp links to Buttons to the navbar
      <Nav.Button as={Link} to="/">
        Inicio
      </Nav.Button> */}
      <Button as={Link} to="/signup" className="nav-link">
        Registrarme <i className="fas fa-user-plus"></i>
      </Button>
      <Button as={Link} to="/login" className="nav-link">
        Ingresar
      </Button>
    </Nav>
  );
}
