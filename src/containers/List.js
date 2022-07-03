import React, { useContext } from 'react';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { createCartItem } from '../api/cartItems';
import { getCart } from '../api/carts';
import useProducts from '../hooks/useProducts';
import CartContext from './CartContext';

export default function List() {
  const { data, error, loading } = useProducts();
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  async function onSubmit(event, item) {
    event.preventDefault();
    if (cart) {
      await createCartItem({
        quantity: event.target.quantity.value,
        cartId: cart.id,
        productId: item.id,
      });
      const response = await getCart({ id: cart.id });
      setCart(response.data);
    } else {
      navigate('/login');
    }
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <Alert variant="danger">={error}</Alert>}
      <div className="d-flex flex-wrap justify-content-around mb-3">
        {data.map((item) => (
          <div key={item.id}>
            <Card className="text-center" style={{ width: '10rem' }}>
              <Card.Img
                style={{ objectFit: 'contain' }}
                height="100px"
                variant="top"
                src={item.picture}
              />
              <Card.Body>
                <Card.Title>
                  {item.name}
                  <br />
                  <span className="text-muted">
                    ${item.price} / {item.unit}
                  </span>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.producer.name}
                </Card.Subtitle>
                <Form
                  onSubmit={function (event) {
                    onSubmit(event, item);
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="text" name="quantity" />
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={loading}>
                    Agregar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
