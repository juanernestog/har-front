import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Card, Spinner } from 'react-bootstrap';
import CartContext from '../containers/CartContext';
import { createCart } from '../api/carts';
import UserContext from '../containers/UserContext';

const epaycoParam = new URLSearchParams(window.location.search);
const paycoId = epaycoParam.get('ref_payco');

export default function PaymentResponse() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const { setCart } = useContext(CartContext);

  const loadPaycoInfo = useCallback(() => {
    try {
      setLoading(true);
      axios
        .get(`https://secure.epayco.co/validation/v1/reference/${paycoId}`)
        .then(async (response) => {
          const { data: json } = response;
          setData(json);
          if (data?.data?.x_response === 'Aceptada') {
            const newCart = await createCart({
              userId: user.id,
              address: 'empty',
            });
            setCart(newCart.data);
            localStorage.setItem('cart', JSON.stringify(newCart.data));
          }
        });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [user, setCart, data]);

  useEffect(() => {
    loadPaycoInfo();
  }, [loadPaycoInfo]);

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

      <Card
        border="primary"
        style={{
          margin: 'auto',
          marginTop: '1rem',
          width: '50%',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <Card.Body>
          <Card.Title>Información de la compra</Card.Title>
          <Card.Text>
            <p>{data?.data?.x_fecha_transaccion}</p>
            <p>La transacción ha sido {data?.data?.x_response}</p>
            <p>Valor en COP ${data?.data?.x_amount}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
