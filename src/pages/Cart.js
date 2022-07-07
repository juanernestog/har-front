import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import { deleteCartItem } from '../api/cartItems';
import { getCart } from '../api/carts';
import CartContext from '../containers/CartContext';

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const calculateTotal = useCallback(() => {
    let subtotal = 0;
    cart.cartItems?.map(
      (item) => (subtotal += item.quantity * item.product.price),
    );
    setTotal(subtotal);
  }, [cart.cartItems]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  async function removeCartItem(event, id) {
    event.preventDefault();
    setLoading(true);
    try {
      await deleteCartItem({ id });
      const response = await getCart({ id: cart.id });
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {cart.cartItems?.map((item) => (
        <div key={item.id}>
          <Card className="text-center" style={{ width: '10rem' }}>
            <Card.Img
              style={{ objectFit: 'contain' }}
              height="100px"
              variant="top"
              src={item.product?.picture.path}
            />
            <Card.Body>
              <Card.Title>
                {item.product.name}
                <br />
                <span className="text-muted">
                  ${item.product?.price} / {item.product?.unit}
                </span>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <span>Cantidad: {item.quantity}</span>
                <br />
                <span>Subtotal: {item.quantity * item.product?.price}</span>
              </Card.Subtitle>
              <Button
                variant="danger"
                onClick={function (event) {
                  removeCartItem(event, item.id);
                }}
              >
                Eliminar
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
      <div>Total: {total}</div>
      <Button>Pagar</Button>
    </>
  );
}
