import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LogIn() {
  return (
    <>
      <Card
        border="primary"
        style={{
          margin: 'auto',
          marginTop: '1rem',
          width: '35%',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <Card.Body>
          <Card.Title>Iniciar sesión</Card.Title>
          <Card.Text>
            Selecciona el tipo de usuario con el que quieres iniciar sesión
          </Card.Text>
          <div className="d-flex justify-content-around mt-5 pt-5">
            <Button as={Link} variant="primary" to="/login/clients">
              Cliente
            </Button>
            <Button as={Link} variant="primary" to="/login/producers">
              Productor
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
