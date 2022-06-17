import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserContext from '../containers/UserContext';

export default function NavUser() {
  const { user } = useContext(UserContext);
  if (user?.type === 'producer') {
    return (
      <Nav className="nav">
        <Link to={`/producers/${user.id}`} className="nav-link">
          {user.name} <i className="fas fa-user-plus"></i>
        </Link>
        <Link to="/logout" className="nav-link">
          Cerrar Sesión
        </Link>
      </Nav>
    );
  } else if (user?.type === 'client') {
    return (
      <Nav className="nav">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <Link to={`/clients/${user.id}`} className="nav-link">
          {user.name} <i className="fas fa-user-plus"></i>
        </Link>
        <Link to="/logout" className="nav-link">
          Cerrar Sesión
        </Link>
      </Nav>
    );
  } else {
    return (
      <Nav className="nav">
        <Link to="/signup" className="nav-link">
          Registrarme <i className="fas fa-user-plus"></i>
        </Link>
        <Link to="/login" className="nav-link">
          Ingresar
        </Link>
      </Nav>
    );
  }
}
