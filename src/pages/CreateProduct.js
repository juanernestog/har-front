import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { createProduct } from '../api/products';

export default function Create() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    const { name, quantity, category, price, unit } = event.target.elements;

    try {
      setError('');
      setLoading(true);

      await createProduct({
        name: name.value,
        quantity: quantity.value,
        category: category.value,
        price: price.value,
        unit: unit.value,
      });

      setLoading(false);
      navigate('/');
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="my-4">Crear un producto</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" />
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="text" name="quantity" />
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" />
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" name="price" />
          <Form.Label>Unit</Form.Label>
          <Form.Control type="text" name="unit" />
          <Form.Label>Image</Form.Label>
          <Form.Control type="text" name="image" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Crear
        </Button>
      </Form>
    </>
  );
}
