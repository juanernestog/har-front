import React from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';

export default function Contact() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="mt5">
              <Card.Body>
                <Card.Title className="mt5">¿Como contactarnos?</Card.Title>
                <Card.Text>
                  {' '}
                  <li className="list-unstyled">
                    <a href="/about"> ¿Quienes somos? </a>
                  </li>
                  <li className="list-unstyled">
                    <p> Correo: Harvestify-info@Harvestify.com </p>
                  </li>
                  <li className="list-unstyled">
                    <p> Linea de atencion:</p>
                    <a href="tel:+573008989898"> 3008989898 </a>
                  </li>
                  <li className="list-unstyled">
                    <br />
                    <p> Direccion:</p>
                    <p>
                      {' '}
                      Oficina Medellin: Cr 49 # 123 - 77 , Medellin, Colombia
                    </p>
                    <p> Oficina Bogotá: Cr 1 # 342 - 123 , Bogotá, Colombia </p>
                  </li>{' '}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
