import React from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';

export default function About() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div
              classname="mt5 p5"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Card>
                <Card.Body>
                  <Card.Title className="mt5 pt5">¿Quienes somos?</Card.Title>
                  <Card.Text>
                    {' '}
                    Harvestify es una empresa que ofrece una plataforma de
                    compra y venta de productos agrícolas.{' '}
                  </Card.Text>
                  <Card.Text>
                    {' '}
                    Nos encontramos en las ciudades de Medellín y Bogotá,
                    Colombia.{' '}
                  </Card.Text>
                  <Card.Text>
                    {' '}
                    Nos enorgullece ayudar a todos los usuarios de nuestra
                    plataforma. Clientes y productores nuestro compromiso es que
                    sea mejor para todos la comercializacion directa{' '}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
