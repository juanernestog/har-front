import React, { useContext, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { createProduct } from '../api/products';
import UserContext from '../containers/UserContext';

export default function Create() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  async function onSubmit(event) {
    event.preventDefault();

    const { name, quantity, category, price, unit, picture } =
      event.target.elements;

    const formData = new FormData();

    formData.append('name', name.value);
    formData.append('quantity', quantity.value);
    formData.append('category', category.value);
    formData.append('price', price.value);
    formData.append('unit', unit.value);
    formData.append('picture', picture.files[0]);

    try {
      setError('');
      setLoading(true);

      await createProduct({
        name: name.value,
        quantity: quantity.value,
        category: category.value,
        price: price.value,
        unit: unit.value,
        picture: picture.value,
        userId: user._id,
      });

      setLoading(false);
      navigate(`/producers/${user._id}`);
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
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="name" />
          <Form.Label>Cantidad</Form.Label>
          <Form.Control type="text" name="quantity" />
          <Form.Label>Categoría</Form.Label>
          <Form.Control type="text" name="category" />
          <Form.Label>Precio</Form.Label>
          <Form.Control type="text" name="price" />
          <Form.Label>Unidad</Form.Label>
          <Form.Control type="text" name="unit" />
          <Form.Label>Foto</Form.Label>
          <Form.Control
            type="file"
            name="picture"
            accept="image/jpeg, image/png"
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Crear
        </Button>
      </Form>
    </>
  );
}
