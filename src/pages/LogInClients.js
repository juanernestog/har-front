import React, { useContext } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createCart } from '../api/carts';

import { logIn } from '../api/clients';
import CartContext from '../containers/CartContext';
import UserContext from '../containers/UserContext';
import useFetchState from '../hooks/useFetchState';

export default function LogIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);
  const [{ error, loading }, dispatch] = useFetchState();

  async function onSubmit(event) {
    event.preventDefault();

    const { email, password } = event.target.elements;

    try {
      dispatch({ type: 'FETCH' });
      const json = await logIn({
        email: email.value,
        password: password.value,
      });
      const cart = await createCart({
        userId: json.data.id,
        address: 'empty',
      });
      dispatch({ type: 'FULLFILLED' });
      json.data.type = 'client';
      setUser(json.data);
      setCart(cart.data);
      navigate(`/`);
    } catch (error) {
      dispatch({ type: 'REJECTED', payload: error });
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          margin: 'auto',
          marginTop: '1rem',
          width: '30%',
          border: '3px solid green',
          padding: '10px',
        }}
      >
        <h2 className="my-4 text-center">Iniciar Sesión</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Escribe tu email"
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Escribe tu contraseña"
              name="password"
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            Entrar
          </Button>
        </Form>
      </div>
    </>
  );
}
