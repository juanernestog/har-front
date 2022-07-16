import React, { useContext } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { updateCartItem } from '../api/cartItems';
import UserContext from '../containers/UserContext';
import useProfile from '../hooks/useProfileClients';
// import { createCartItem } from '../api/cartItems';
// import { getCart } from '../api/carts';
// import useProducts from '../hooks/useProducts';
// import CartContext from './CartContext';

export default function UserProfile() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { data, error, loading } = useProfile({ id });

  async function removeCartItem(event, id) {
    event.preventDefault();
    await updateCartItem({ id }, { quantity: 0 });
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Container>
        <Row>
          <Col sm={2} className="px-4 py-4 my-5 text-center">
            <Card>
              <h1 className="">Perfil</h1>
              <p className="">
                <strong>Nombre:</strong> {data.name}
              </p>
              <p className="">
                <strong>Email:</strong> {data.email}
              </p>
              <p className="">
                <strong>Teléfono:</strong> {data.tel}
              </p>
              {user.id === data.id && (
                <Button
                  as={Link}
                  className="btn btn-primary mt-4"
                  to={`/clients/profile/${id}`}
                >
                  Editar Perfil
                </Button>
              )}
            </Card>
          </Col>
          <Col sm={10} className="px-4 py-4 my-5 text-center">
            <div className="mx-auto">
              <h2>
                {}Carrito{}
              </h2>
              <div className="d-flex flex-wrap justify-content-around">
                {data.cart.map((item) => (
                  <div key={item.id}>
                    <Card className="text-center" style={{ width: '10rem' }}>
                      <Card.Img variant="top" src={item.picture?.path} />
                      <Card.Body>
                        <Card.Title>
                          {item.name}
                          <br />
                          <span className="text-muted">
                            ${item.price} / {item.unit}
                          </span>
                        </Card.Title>
                        <Card.Subtitle>{item.category}</Card.Subtitle>
                        <Button className="m-3" variant="primary">
                          Editar
                        </Button>
                        <Button
                          className="m-3"
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
              <Button as={Link} variant="primary" to="/addProduct">
                Añadir Al Carrito
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
