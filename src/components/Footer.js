import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <Card.Footer
      color="blue"
      class="font-small pt-4 mt-4 fixed-bottom bg-light"
    >
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col md="6">
            <h5 className="title">Harvestify</h5>
            <p className="align-middle">
              Somos una empresa que ofrece una plataforma de compra y venta de
              productos agrícolas.
            </p>
          </Col>
          <Col md="6">
            <h5 className="title">Links de interes</h5>
            <ul>
              <li className="list-unstyled">
                <a href="/about"> ¿Quienes somos? </a>
              </li>
              <li className="list-unstyled">
                <a href="/contact"> Contactanos </a>
              </li>
              <li className="list-unstyled">
                <p> Linea de atencion: </p>
                <br />
                <a href="tel:+573008989898"> 3008989898 </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-copyright text-center py-3">
        <Container fluid>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a href="https://www.harvertify.com"> Harvestify.com </a>
        </Container>
      </div>
    </Card.Footer>
  );
}
