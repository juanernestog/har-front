import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';

export default function List() {
  const navigate = useNavigate();

  const { data, error, loading } = useProducts();

  function onDisplayProduct(event, id) {
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
      <div className="d-flex justify-content-around mb-3">
        {data.map((item) => (
          <div
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
      </div>
    </>
  );
}
