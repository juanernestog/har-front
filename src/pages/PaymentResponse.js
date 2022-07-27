import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
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
        .then((response) => {
          const { data: json } = response;
          setData(json);
          if (data?.data?.x_response === 'Aceptada') {
            const cart = createCart({
              userId: user.id,
              address: 'empty',
            });
            setCart(cart.data);
            localStorage.setItem('cart', JSON.stringify(cart.data));
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
      <div
        style={{
          margin: 'auto',
          marginTop: '1rem',
          width: '50%',
          border: '3px solid green',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <h2>Información de la compra</h2>
        <p>{data?.data?.x_fecha_transaccion}</p>
        <p>La transacción ha sido {data?.data?.x_response}</p>
        <p>Valor en COP ${data?.data?.x_amount}</p>
      </div>
    </>
  );
}
