import React from 'react';

import { Button, Card } from 'react-bootstrap';

export default function ProductCard({
  producer = {},
  name = '',
  price = '',
  unit = '',
  picture = '',
}) {
  return (
    <Card className="text-center" style={{ width: '10rem' }}>
      <Card.Img variant="top" src={picture} />
      <Card.Body>
        <Card.Title>
          {name}
          <br />
          <span className="text-muted">
            ${price} / {unit}
          </span>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {producer.name}
        </Card.Subtitle>
        <Button variant="primary">Añadir al carrito</Button>
      </Card.Body>
    </Card>
  );
}
