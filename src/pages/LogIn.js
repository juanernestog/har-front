import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LogIn() {
  return (
    <>
      <div
        style={{
          margin: 'auto',
          marginTop: '1rem',
          width: '300px',
          border: '3px solid green',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <h2 className="my-4">Iniciar Sesión</h2>
        <div className="d-flex justify-content-around mt-5 pt-5">
          <Button as={Link} variant="primary" to="/login/clients">
            Cliente
          </Button>
          <Button as={Link} variant="primary" to="/login/producers">
            Productor
          </Button>
        </div>
      </div>
    </>
  );
}
