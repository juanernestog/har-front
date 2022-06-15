import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LogIn() {
  return (
    <>
      <Button as={Link} variant="primary" to="/login/clients">
        Cliente
      </Button>
      <Button as={Link} variant="primary" to="/login/producers">
        Productor
      </Button>
    </>
  );
}
