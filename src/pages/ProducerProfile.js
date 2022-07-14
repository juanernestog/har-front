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
import { deleteProduct } from '../api/products';
import UserContext from '../containers/UserContext';
import useProfile from '../hooks/useProfileProducers';

export default function ProducerProfile() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { data, error, loading } = useProfile({ id });

  async function removeProduct(event, id) {
    event.preventDefault();
    await deleteProduct({ id });
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
          <Col sm={4} className="px-4 py-4 my-5 text-center">
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
                to={`/producers/profile/${id}`}
              >
                Editar Perfil
              </Button>
            )}
          </Col>
          <Col sm={8} className="px-4 py-4 my-5 text-center">
            <div className="mx-auto">
              <h2>Productos</h2>
              <div className="d-flex flex-wrap justify-content-around">
                {data.products.map((item) => (
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
                            removeProduct(event, item.id);
                          }}
                        >
                          Eliminar
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
              <Button as={Link} variant="primary" to="/createProduct">
                Crear Producto
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
