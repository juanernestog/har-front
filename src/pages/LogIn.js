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
          width: '30%',
          border: '3px solid green',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <h2 className="my-4">Iniciar Sesión</h2>
        <div className="d-flex justify-content-center">
          <Button
            className="m-5"
            as={Link}
            variant="primary"
            to="/login/clients"
          >
            Cliente
          </Button>
          <Button
            className="m-5"
            as={Link}
            variant="primary"
            to="/login/producers"
          >
            Productor
          </Button>
        </div>
      </div>
    </>
  );
}
