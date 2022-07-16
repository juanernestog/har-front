import React, { useContext, useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { deleteCartItem } from '../api/cartItems';
import { Link, useParams } from 'react-router-dom';
import { getCart } from '../api/carts';
import UserContext from '../containers/UserContext';
import CartContext from '../containers/CartContext.js';

export default function UserProfile() {
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
                  <Card.Text>
                    {user.name} {user.lastname}
                  </Card.Text>
                  <Card.Text>
                    <b>Teléfono:</b> {user.tel}
                  </Card.Text>
                  <Card.Text>
                    <b>Dirección:</b> {cart.address}
                  </Card.Text>
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
    </>
  );
}

//   return (
//     <>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Container>
//         <Row>
//           <Col sm="2" className="px-4 py-4 my-5 text-center">
//             <Card>
//               <h1 className="">Perfil</h1>
//               <p className="">
//                 <strong>Nombre:</strong> {user.name}
//               </p>
//               <p className="">
//                 <strong>Email:</strong> {user.email}
//               </p>
//               <p className="">
//                 <strong>Teléfono:</strong> {user.tel}
//               </p>
//               {user.id === cart.id && (
//                 <Button
//                   as={Link}
//                   className="btn btn-primary mt-4"
//                   to={`/clients/profile/${user.id}`}
//                 >
//                   Editar Perfil
//                 </Button>
//               )}
//             </Card>
//           </Col>
//           <Col sm={10} className="px-4 py-4 my-5 text-center">
//             <div className="mx-auto">
//               <h2>
//                 {}Carrito{}
//               </h2>
//               <div className="d-flex flex-wrap justify-content-around">
//                 {cart.map((item) => (
//                   <div key={item.id}>
//                     <Card className="text-center" style={{ width: '10rem' }}>
//                       <Card.Img variant="top" src={item.picture?.path} />
//                       <Card.Body>
//                         <Card.Title>
//                           {item.name}
//                           <br />
//                           <span className="text-muted">
//                             ${item.price} / {item.unit}
//                           </span>
//                         </Card.Title>
//                         <Card.Subtitle>{item.category}</Card.Subtitle>
//                         <Button className="m-3" variant="primary">
//                           Editar
//                         </Button>
//                         <Button
//                           className="m-3"
//                           variant="danger"
//                           onClick={function (event) {
//                             removeCartItem(event, item.id);
//                           }}
//                         >
//                           Eliminar
//                         </Button>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                 ))}
//               </div>
//               <Button as={Link} variant="primary" to="/addProduct">
//                 Añadir Al Carrito
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }
