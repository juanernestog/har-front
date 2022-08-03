import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Form,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteCartItem } from '../api/cartItems';
import { getCart, updateCart } from '../api/carts';
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

  async function removeCartItem(event, id) {
    event.preventDefault();
    setLoading(true);
    try {
      await deleteCartItem({ id });
      const response = await getCart({ id: cart.id });
      setCart(response.data);
      localStorage.setItem('cart', JSON.stringify(response.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  async function setAddress(event) {
    event.preventDefault();
    setLoading(true);
    const actualCart = cart;
    actualCart.address = event.target.address.value;
    await setCart(actualCart);
    await updateCart({
      id: cart.id,
      address: event.target.address.value,
      total: total,
    });
    setLoading(false);
  }

  async function pay(event) {
    event.preventDefault();
    try {
      const handler = window.ePayco.checkout.configure({
        key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
        test: true,
      });
      const description = cart.cartItems?.map(
        (item) => `${item.product.name}X${item.quantity}`,
      );
      await handler.open({
        //Parametros compra (obligatorio)
        name: 'Compra',
        description: description.join(', '),
        invoice: cart.id,
        currency: 'cop',
        amount: total,
        tax_base: '0',
        tax: '0',
        country: 'co',
        lang: 'es',

        //Onpage="false" - Standard="true"
        external: 'false',

        //Atributos opcionales
        confirmation: 'http://secure2.payco.co/prueba_curl.php',
        response: `${process.env.REACT_APP_BASE_URL}/payment-response`,

        //Atributos cliente
        name_billing: user.name,
        address_billing: cart.address,
        mobilephone_billing: user.tel,
        type_doc_billing: '',
        number_doc_billing: '',

        //atributo deshabilitación metodo de pago
        methodsDisable: ['CASH'],
      });
    } catch (error) {
      setError(error);
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
      {error && <Alert variant="danger">{error}</Alert>}
      {cart.cartItemsCount && (
        <>
          <div className="mt-5">
            <h2>Carrito</h2>
            {cart.cartItems?.map((item) => (
              <div key={item.id}>
                <Card
                  className="text-center flex-row align-items-center"
                  style={{ width: '20rem' }}
                >
                  <Card.Img
                    style={{ objectFit: 'contain' }}
                    height="100px"
                    variant="left"
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
                      <span>
                        Subtotal: ${item.quantity * item.product?.price}
                      </span>
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
          </div>
          <div>Total: ${total}</div>
          <Form
            onSubmit={function (event) {
              setAddress(event);
            }}
          >
            <InputGroup className="mb-3 w-50">
              <Form.Control
                type="text"
                placeholder="Escribe la dirección de entrega"
                name="address"
              />
              <Button type="submit" variant="outline-primary">
                Aceptar
              </Button>
            </InputGroup>
          </Form>
          <Button
            variant="primary"
            onClick={function (event) {
              pay(event);
            }}
          >
            Pagar
          </Button>
        </>
      )}
      {!cart.cartItemsCount && (
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">
            El carrito de compras está vacío
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Click {<Link to="/">aquí</Link>} para regresar al inicio
            </p>
          </div>
        </div>
      )}
    </>
  );
}
