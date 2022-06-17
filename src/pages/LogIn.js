import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LogIn() {
  return (
    <>
      <h2 className="my-4">Iniciar Sesión</h2>
      <Button as={Link} variant="primary" to="/login/clients">
        Cliente
      </Button>
      <Button as={Link} variant="primary" to="/login/producers">
        Productor
      </Button>
    </>
  );
}
