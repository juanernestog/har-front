import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <>
      <h2 className="my-4">Registrase</h2>
      <div className="d-flex justify-content-center">
        <Button as={Link} variant="primary" to="/signup/clients">
          Cliente
        </Button>
        <Button as={Link} variant="primary" to="/signup/producers">
          Productor
        </Button>
      </div>
    </>
  );
}
