import { ErrorMessage, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { updateClient } from '../api/clients';
import UserContext from '../containers/UserContext';

const profileSchema = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  tel: Yup.string().required(),
});

export default function EditProfileClient() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    try {
      setError('');
      setLoading(true);
      const response = await updateClient(user.id, values);
      setUser(response.data);
      navigate(`/clients/${user.id}`);
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
      setLoading(false);
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
      <h2 className="my-4">Editar perfil</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Container>
        <Row>
          <Col sm={6}>
            <Formik
              initialValues={{
                firstname: user.firstname,
                lastname: user.lastname,
                tel: user.tel,
                email: user.email,
              }}
              onSubmit={onSubmit}
              validationSchema={profileSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Escribe tu nombre"
                      name="firstname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstname}
                      required
                      className={
                        touched.firstname && errors.firstname
                          ? 'is-invalid'
                          : ''
                      }
                    />
                    <ErrorMessage
                      name="firstname"
                      className="invalid-feedback"
                      component="div"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Escribe tu apellido"
                      name="lastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                      required
                      className={
                        touched.lastname && errors.lastname ? 'is-invalid' : ''
                      }
                    />
                    <ErrorMessage
                      name="lastname"
                      className="invalid-feedback"
                      component="div"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Escribe tu email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      required
                      className={
                        touched.email && errors.email ? 'is-invalid' : ''
                      }
                    />
                    <ErrorMessage
                      name="email"
                      className="invalid-feedback"
                      component="div"
                    />
                  </Form.Group>
                  <ErrorMessage
                    name="password"
                    className="invalid-feedback"
                    component="div"
                  />
                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Escribe tu teléfono"
                      name="tel"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tel}
                      required
                      className={touched.tel && errors.tel ? 'is-invalid' : ''}
                    />
                    <ErrorMessage
                      name="tel"
                      className="invalid-feedback"
                      component="div"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Actualizar
                  </Button>
                  <Button
                    as={Link}
                    to={`/clients/${user.id}`}
                    variant="outline-primary mx-3"
                  >
                    Cancelar
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
}
