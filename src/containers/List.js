import React, { useContext, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Form,
  Pagination,
  Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { createCartItem } from '../api/cartItems';
import { getCart } from '../api/carts';
import useProducts from '../hooks/useProducts';
import CartContext from './CartContext';
import swal from 'sweetalert';

export default function List() {
  const [page, setPage] = useState(1);
  const { data, meta, error, loading } = useProducts(page);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  async function onSubmit(event, item) {
    event.preventDefault();
    if (cart) {
      try {
        await createCartItem({
          quantity: event.target.quantity.value,
          cartId: cart.id,
          productId: item.id,
        });
        const response = await getCart({ id: cart.id });
        setCart(response.data);
        localStorage.setItem('cart', JSON.stringify(response.data));
        swal('Exito', 'Producto agregado al carrito', 'success');
      } catch (error) {
        swal('Error', error.message, 'error').then((value) => {
          navigate('/');
        });
      }
    } else {
      navigate('/login');
    }
  }

  let items = [
    <Pagination.Prev
      key="prev"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    />,
  ];
  let active = meta?.page;
  for (let number = 1; number <= meta?.pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setPage(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }
  items.push(
    <Pagination.Next
      key="next"
      disabled={page === meta?.pages}
      onClick={() => setPage(page + 1)}
    />,
  );

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
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="d-flex flex-wrap justify-content-around mb-3 mt-3">
        {data.map((item) => (
          <div
            className="d-flex justify-content-center product-card"
            key={item.id}
            style={{ flexBasis: '20%' }}
          >
            <Card className="text-center my-3" style={{ width: '12rem' }}>
              <Card.Img
                style={{ objectFit: 'contain' }}
                height="100px"
                variant="top"
                src={item.picture.path}
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
                    <br />
                    <Form.Control
                      type="number"
                      min="1"
                      name="quantity"
                      style={{ width: '5rem', margin: 'auto' }}
                    />
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
      {meta?.pages > 1 && (
        <div className="d-flex justify-content-center">
          <Pagination>{items}</Pagination>
        </div>
      )}
    </>
  );
}
