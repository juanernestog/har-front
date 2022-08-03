import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SignUp() {
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
          <Card.Title>Registrarse</Card.Title>
          <Card.Text>
            Selecciona el tipo de usuario con el que quieres registrarte
          </Card.Text>
          <div className="d-flex justify-content-around mt-5 pt-5">
            <Button as={Link} variant="primary" to="/signup/clients">
              Cliente
            </Button>
            <Button as={Link} variant="primary" to="/signup/producers">
              Productor
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
