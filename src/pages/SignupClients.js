import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import swal from 'sweetalert';

import { signUp } from '../api/clients';

const profileSchema = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  tel: Yup.string().required(),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    try {
      setError('');
      setLoading(true);
      await signUp(values);
      navigate('/');
      setSubmitting(false);
      swal('Exito', 'Usuario creado', 'success');
    } catch (error) {
      console.log(error);
      setError(error);
      swal('Error', 'Error al crear usuario', 'error');
    } finally {
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
      <h2 className="my-4">Registrarse como cliente</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Container>
        <Row>
          <Col sm={6}>
            <Formik
              initialValues={{}}
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
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Escribe tu contraseña"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      required
                      className={
                        touched.password && errors.password ? 'is-invalid' : ''
                      }
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
                    Submit
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
