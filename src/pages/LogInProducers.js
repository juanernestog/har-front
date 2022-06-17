import React, { useContext } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { logIn } from '../api/producers';
import UserContext from '../containers/UserContext';
import useFetchState from '../hooks/useFetchState';

export default function LogIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
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
      dispatch({ type: 'FULLFILLED' });
      json.data.type = 'producer';
      setUser(json.data);
      navigate(`/producers/${json.data._id}`);
    } catch (error) {
      dispatch({ type: 'REJECTED', payload: error });
    }
  }

  return (
    <>
      <h2 className="my-4">Iniciar Sesión</h2>
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
    </>
  );
}
