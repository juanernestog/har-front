import React from 'react';
import { Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavUser() {
  return (
    <Nav>
      <Link to="/signup" className="nav-link">
        Registrarme
      </Link>
      <Link to="/signin" className="nav-link">
        Ingresar
      </Link>
    </Nav>
  );
}
