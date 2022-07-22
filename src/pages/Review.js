import React, {
  useContext,
  useState /*, useCallback, useEffect*/,
} from 'react';
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
import { useNavigate } from 'react-router-dom';
//import UserContext from '../containers/UserContext';
import CartContext from '../containers/CartContext.js';
import { deleteReview, createReview, getReview } from '../api/reviews';
import { Rating } from 'react-simple-star-rating';

export default function Review(event, item) {
  //const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  async function onSubmit(event, item) {
    event.preventDefault();
    setLoading(true);
    try {
      if (
        cart &&
        cart.cartItems &&
        cart.cartItems.length > 0 /*&& cart.payed*/
      ) {
        await createReview({
          cartId: cart.id,
          score: event.target.score.value,
          comment: event.target.comment.value,
        });
        const response = await getReview({ id: cart.id });
        setCart(response.data);
      } else {
        navigate('/reviews');
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
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

  // async function addReview(event) {
  //   event.preventDefault();
  //   try {
  //     await createReview({ id: cart.id });
  //     const response = await deleteReview({ id: cart.id });
  //     setCart(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     setError(error);
  //   }
  // }

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
                  {
                    // review stars here
                  }
                  <Card.Text>
                    <Form
                      onSubmit={function (event) {
                        onSubmit(event, {
                          rating: rating,
                          comment: event.target.comment.value,
                        });
                      }}
                    >
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
                          rows="6"
                          placeholder="Escribe tu reseña"
                        ></textarea>
                      </div>
                      <Button
                        type="submit"
                        className="btn btn-primary btn-block-sm mt-2 mb-2 "
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
