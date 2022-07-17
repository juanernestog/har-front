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
import { Link, useParams } from 'react-router-dom';
import { getCart } from '../api/carts';
import UserContext from '../containers/UserContext';
import CartContext from '../containers/CartContext.js';
import { deleteReview } from '../api/reviews';
import ReactStars from 'react-rating-stars-component';

export default function Review() {
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function removeReview(event, id) {
    event.preventDefault();
    setLoading(true);
    try {
      await deleteReview({ id });
      const response = await deleteReview({ id: cart.id });
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  async function addReview(event) {
    event.preventDefault();
    try {
      await deleteReview({ id: cart.id });
      const response = await deleteReview({ id: cart.id });
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
            <div
              className="mt-5"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Card>
                <Card.Body>
                  <Card.Title>{' Deja tu reseña aqui '}</Card.Title>
                  {
                    // review stars here
                  }
                  <Card.Text>
                    <form onSubmit={addReview}>
                      <div className="form-group">
                        <label htmlFor="review">Reseña</label>

                        <textarea
                          className="form-control"
                          id="review"
                          rows="3"
                          placeholder="Escribe tu reseña"
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Enviar
                      </button>
                    </form>
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
