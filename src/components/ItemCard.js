import React from 'react';

import Card from 'react-bootstrap/Card';

export default function ItemCard({ user = {}, product = {}, imageUrl = '' }) {
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>
          {product}
          <p className="text-muted">{product.name}</p>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <p className="text-muted">
            {product.cost} COP / {product.costUnit}
          </p>
          <p className="text-muted">{product.username}</p>
        </Card.Subtitle>
        <Card.Img variant="top" src={imageUrl} />
      </Card.Body>
    </Card>
  );
}
