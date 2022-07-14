import React, { useContext, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

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

      await createProduct(formData);

      setLoading(false);
      navigate(`/producers/${user.id}`);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  return (
    <>
      <h2 className="my-4">Crear un producto</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Container>
        <Row>
          <Col sm={6}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-1">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="name" />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control type="text" name="quantity" />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Categoría</Form.Label>
                <br />
                <Form.Select className="form-select" name="category">
                  <option>Seleccionar categoría</option>
                  <option value="Fruta">Fruta</option>
                  <option value="Verdura">Verdura</option>
                  <option value="Lácteos y Huevos">Lácteos y Huevos</option>
                  <option value="Otro">Otro</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Unidad</Form.Label>
                <Form.Control type="text" name="unit" />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="text" name="price" />
              </Form.Group>
              <Form.Group className="mb-3">
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
              <Button
                as={Link}
                to={`/producers/${user.id}`}
                variant="outline-primary mx-3"
              >
                Cancelar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
