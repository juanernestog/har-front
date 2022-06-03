import React from 'react';

import Card from 'react-bootstrap/Card';

export default function TweetCard({ product = {}, content = '', date = '' }) {
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>
          {product.name}
          <span className="text-muted">
            ${product.cost} / {product.unit}
          </span>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {product.location}
        </Card.Subtitle>
        <Card.Text>{product.image}</Card.Text>
      </Card.Body>
    </Card>
  );
}
