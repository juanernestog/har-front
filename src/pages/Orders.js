import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { deleteCartItem } from '../api/cartItems';
//import { getCart } from '../api/carts';
import CartContext from '../containers/CartContext';
import UserContext from '../containers/UserContext';

export default function Cart() {
  const { user } = useContext(UserContext);
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
      {cart.cartItemsCount && (
        <>
          <div className="mt-5">
            <h2>Ordenes completadas</h2>
            {user?.map((item) => (
              <>
                <Card key={item.id}>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/orders/${item.id}`}>Orden {item.id}</Link>
                    </Card.Title>
                    <Card.Text>
                      <strong>Dirección:</strong>
                      {item.address}
                    </Card.Text>
                    <Card.Text>
                      <strong>Teléfono:</strong>
                      {item.tel}
                    </Card.Text>
                    <Card.Text>
                      <strong>Total:</strong>
                      {total}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <div key={item.id}>
                  <Card
                    className="text-center flex-row align-items-center"
                    style={{ width: '20rem' }}
                  >
                    <Card.Img
                      style={{ objectFit: 'contain' }}
                      height="100px"
                      variant="left"
                      src={item.cart?.cartItems?.picture.path}
                    />
                    <Card.Body>
                      <Card.Title>
                        {item.cart.createdAt.split('T')[0]}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
}
