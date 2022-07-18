import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import UserContext from '../containers/UserContext';
import CartContext from '../containers/CartContext.js';
import { deleteReview, getReviews } from '../api/reviews';
import { Rating } from 'react-simple-star-rating';

// This page is for the user to review the product they have purchased.
// The user can also delete their review if they wish.

// verify that the cart has been bought
// if not alert cant review product until cart is bought
// if cart is bought, display review form
// if review is submitted, display review
// if review is deleted, display review
// if review is edited, display review

export default function Review() {
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [review, setReview] = useState([getReviews(cart.id)]);

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

  const [rating, setRating] = useState(review?.rating);

  const handleRating = (rate) => {
    setRating(rate);
    setReview(review.concat(rate));
    // Some logic
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
                  {
                    // review stars here
                  }
                  <Card.Text>
                    <form onSubmit={addReview}>
                      <div className="form-group">
                        <Rating
                          onClick={handleRating}
                          ratingValue={rating}
                          size={20}
                          label
                          transition
                          fillColor="orange"
                          emptyColor="gray"
                          className="justify-content-center" // Will remove the inline style if applied
                        />
                        <textarea
                          className="form-control"
                          id="review"
                          rows="3"
                          placeholder="Escribe tu reseña"
                        ></textarea>
                      </div>
                      <Button type="submit" className="btn btn-primary">
                        Enviar
                      </Button>
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
