import React from 'react';

import { Button, Card } from 'react-bootstrap';

export default function ProductCard({
  producer = {},
  name = '',
  price = '',
  unit = '',
}) {
  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>
          {name}
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
