import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import CartContext from '../containers/CartContext';
import UserContext from '../containers/UserContext';
import Cart from './Cart';

export default function NavUser() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  function displayCart(event, id) {
    event.preventDefault();
    navigate(`/carts/${id}`);
  }

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
        {/* <Form>
              <Form.Group className="mb-3 nav-search-bar" controlId="SearchBar">
                <Form.Control type="product" placeholder="Buscar" />
              </Form.Group>
            </Form> */}
        <Cart
          count={cart.cartItemsCount}
          onClick={function (event) {
            displayCart(event, cart.id);
          }}
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
