import React, { useContext, useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import { deleteCartItem } from '../api/cartItems';
import { getCart } from '../api/carts';
import UserContext from '../containers/UserContext';
import CartContext from '../containers/CartContext.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteClient } from '../api/clients';

export default function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
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

        external: 'false',

        //Parametros opcionales
        confimation: 'http://secure2.payco.co/prueba_curl.php',
        response: `${process.env.REACT_APP_API_URL}/response`,

        // Atributos del cliente
        name_billing: user.name,
        address_billing: cart.address,
        mobilephone_billing: user.tel,
        type_doc_billing: 'CC',

        //atributos deshabilitados para el pago
        methodDisable: ['CASH'],
      });
    } catch (error) {
      setError(error);
    }
  }

  async function deleteAccount(event, id) {
    event.preventDefault();
    await deleteClient({ id });
    navigate('/logout');
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <Container>
        <Row>
          <Col>
            <div className="mt-5">
              <Card>
                <Card.Body>
                  <Card.Title>{' Datos de usuario '}</Card.Title>
                  <Card.Text>{user.name}</Card.Text>
                  <Card.Text>
                    <b>Teléfono:</b> {user.tel}
                  </Card.Text>
                  <Card.Text>
                    <b>Dirección:</b> {cart.address}
                  </Card.Text>
                  {user.id === id && (
                    <div className="d-flex flex-wrap justify-content-around">
                      <Button
                        as={Link}
                        className="btn btn-primary mt-4"
                        to={`/clients/profile/${id}`}
                      >
                        Editar Perfil
                      </Button>
                      <Button
                        className="btn btn-danger mt-4"
                        onClick={handleShow}
                      >
                        Eliminar cuenta
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className="mt-5 p5">
              <Card>
                <Card.Title>{' Carrito '}</Card.Title>
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
              </Card>
            </div>
            <div>Total: ${total}</div>
            <Button
              variant="primary"
              onClick={function (event) {
                pay(event);
              }}
            >
              Pagar
            </Button>
          </Col>

          <Col>
            <div className="mt-5">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h3>Datos de envío</h3>
                  </Card.Title>
                  <Card.Text>
                    <span>Nombre: {user.name}</span>
                    <br />
                    <span>Teléfono: {user.tel}</span>
                    <br />
                    <span>Dirección: {cart.address}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¿Seguro que desea eliminar esta cuenta?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Si eliminas esta cuenta no podrás recuperarla</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={function (event) {
              deleteAccount(event, user.id);
            }}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
