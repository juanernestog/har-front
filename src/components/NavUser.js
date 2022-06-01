import React from 'react';
import { Nav, Button } from 'react-bootstrap';
//import { Link } from 'react-router-dom';

export default function NavUser() {
  return (
    <Nav class="nav">
      {/* TODO: Swapp links to Buttons to the navbar
      <Nav.Button as={Link} to="/">
        Inicio
      </Nav.Button> */}
      <Button to="/signup" className="nav-link">
        Registrarme <i class="fas fa-user-plus"></i>
      </Button>
      <Button to="/login" className="nav-link">
        Ingresar
      </Button>
    </Nav>
  );
}
