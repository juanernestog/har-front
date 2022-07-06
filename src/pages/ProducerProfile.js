import React, { useContext } from 'react';
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteProduct } from '../api/products';
import UserContext from '../containers/UserContext';
import useProfile from '../hooks/useProfileProducers';

export default function ProducerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { data, error, loading } = useProfile({ id });

  async function removeProduct(event, id) {
    event.preventDefault();
    await deleteProduct({ id });
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
      {error && <Alert variant="danger">={error}</Alert>}
      {user?.id === data.id && (
        <Button
          as={Link}
          className="btn btn-primary mt-4"
          to="/producers/profile"
        >
          Editar Perfil
        </Button>
      )}
      <div className="px-4 py-4 my-5 text-center">
        <h1 className="display-5 fw-bold">{data.name}</h1>
        <div className="mx-auto">
          <h2>Productos</h2>
          <div className="d-flex flex-wrap justify-content-around">
            {data.products.map((item) => (
              <div key={item.id}>
                <Card className="text-center" style={{ width: '10rem' }}>
                  <Card.Img variant="top" src={item.picture.path} />
                  <Card.Body>
                    <Card.Title>
                      {item.name}
                      <br />
                      <span className="text-muted">
                        ${item.price} / {item.unit}
                      </span>
                    </Card.Title>
                    <Button variant="primary">Editar</Button>
                    <Button
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
      </div>
    </>
  );
}
