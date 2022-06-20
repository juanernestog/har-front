import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import { UserProvider } from './containers/UserContext';

const Home = React.lazy(() => import('./pages/Home'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
const Signup = React.lazy(() => import('./pages/Signup'));
const SignupProducers = React.lazy(() => import('./pages/SignupProducers'));
const LogIn = React.lazy(() => import('./pages/LogIn'));
const LogInClients = React.lazy(() => import('./pages/LogInClients'));
const LogInProducers = React.lazy(() => import('./pages/LogInProducers'));
const ProducerProfile = React.lazy(() => import('./pages/ProducerProfile'));
const CreateProduct = React.lazy(() => import('./pages/CreateProduct'));

export default function App() {
  console.log(window.location);

  const [invalidPage, setInvalidPage] = React.useState(false);
  useEffect(() => {
    const functioningRoutes = [
      '/',
      '/login',
      '/login/clients',
      '/login/producers',
      `/about`,
      `/contact`,
      `/producers/:id`,
      `/createProduct`,
    ];
    if (functioningRoutes.includes(window.location.pathname)) {
      console.log('Invalid page', window.location.pathname);
      setInvalidPage(false);
    } else {
      setInvalidPage(true);
    }
  }, []);

  return (
    <UserProvider>
      {!invalidPage && <Header />}
      <Container>
        <Row>
          <Col>
            <React.Suspense
              fallback={
                <div>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/producers" element={<SignupProducers />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/login/clients" element={<LogInClients />} />
                <Route path="/login/producers" element={<LogInProducers />} />
                <Route path="/producers/:id" element={<ProducerProfile />} />
                <Route path="/createProduct" element={<CreateProduct />} />
              </Routes>
            </React.Suspense>
          </Col>
        </Row>
        {!invalidPage && <Footer />}
      </Container>
    </UserProvider>
  );
}
