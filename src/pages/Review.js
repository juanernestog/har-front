import React, { useContext, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Form,
} from 'react-bootstrap';
import CartContext from '../containers/CartContext.js';
import { deleteReview, createReview } from '../api/reviews';
import { Rating } from 'react-simple-star-rating';
export default function Review(event, item) {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const cartExample = JSON.parse(localStorage.getItem('cart'));
  async function onSubmit(e) {
    e.preventDefault();
    try {
      await createReview({
        cartId: cartExample.id,
        score: rating / 20,
        comment: comment,
      });
    } catch {
      alert('Ups! ocurrió un error');
    }
  }
  async function onRemoveReview(event, id) {
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
  const handleRating = (rate) => {
    setRating(rate);
  };
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
              <Card style={{ width: '30rem' }}>
                <Card.Body>
                  <Card.Title>{' Deja tu reseña aqui '}</Card.Title>
                  {}
                  <Card.Text>
                    <Form>
                      <div className="form-group">
                        <Rating
                          onClick={handleRating}
                          ratingValue={rating}
                          size={20}
                          label
                          transition
                          fillColor="orange"
                          emptyColor="gray"
                          className="justify-content-center"
                        />
                        <textarea
                          className="form-control"
                          id="review"
                          rows="6"
                          placeholder="Escribe tu reseña"
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        ></textarea>
                      </div>
                      <Button
                        type="submit"
                        className="btn btn-primary btn-block-sm mt-2 mb-2 "
                        onClick={(event) => {
                          onSubmit(event);
                        }}
                      >
                        Enviar
                      </Button>
                    </Form>
                    <hr />
                    <Form
                      onSubmit={function (event) {
                        onRemoveReview(event, cart.id);
                      }}
                    >
                      <Button type="submit" className="btn btn-danger">
                        Eliminar reseña
                      </Button>
                    </Form>
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
