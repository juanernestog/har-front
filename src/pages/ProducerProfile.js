import React, { useContext } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import UserContext from '../containers/UserContext';
import useProfile from '../hooks/useProfile';

export default function ProducerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { data, error, loading } = useProfile({ id });

  function onDisplayProduct(event, id) {
    event.stopPropagation();
    navigate(`products/${id}`);
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
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">{data.name}</h1>
        <div className="col-lg-6 mx-auto">
          <h2>Mis productos</h2>
          {data.products.map((item) => (
            <div
              className="d-flex justify-content-around"
              key={item.id}
              onClick={function (event) {
                onDisplayProduct(item.id, event);
              }}
            >
              <ProductCard
                producer={item.producer}
                name={item.name}
                price={item.price}
                unit={item.unit}
              />
            </div>
          ))}
          <Button as={Link} variant="primary" to="/createProduct">
            Crear Producto
          </Button>
        </div>
      </div>
    </>
  );
}
