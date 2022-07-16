import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserProvider } from './containers/UserContext';
import { CartProvider } from './containers/CartContext';

const Home = React.lazy(() => import('./pages/Home'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
const Signup = React.lazy(() => import('./pages/Signup'));
const SignupClients = React.lazy(() => import('./pages/SignupClients'));
const SignupProducers = React.lazy(() => import('./pages/SignupProducers'));
const LogIn = React.lazy(() => import('./pages/LogIn'));
const LogInClients = React.lazy(() => import('./pages/LogInClients'));
const Cart = React.lazy(() => import('./pages/Cart'));
const LogInProducers = React.lazy(() => import('./pages/LogInProducers'));
const ProducerProfile = React.lazy(() => import('./pages/ProducerProfile'));
const ClientProfile = React.lazy(() => import('./pages/ClientProfile'));
const EditProfileProducer = React.lazy(() =>
  import('./pages/EditProfileProducer'),
);
const CreateProduct = React.lazy(() => import('./pages/CreateProduct'));
const LogOut = React.lazy(() => import('./pages/LogOut'));
const Contact = React.lazy(() => import('./pages/Contact'));
const About = React.lazy(() => import('./pages/About'));

export default function App() {
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
      `/clients/:id`,
      `/createProduct`,
    ];
    if (functioningRoutes.includes(window.location.pathname)) {
      setInvalidPage(false);
    } else {
      setInvalidPage(true);
    }
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <CartProvider>
          {!invalidPage && <Header />}
          <Container>
            <Row>
              <Col>
                <React.Suspense
                  fallback={
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
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden"></span>
                      </Spinner>
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signup/clients" element={<SignupClients />} />
                    <Route
                      path="/signup/producers"
                      element={<SignupProducers />}
                    />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/login/clients" element={<LogInClients />} />
                    <Route
                      path="/login/producers"
                      element={<LogInProducers />}
                    />
                    <Route
                      path="/producers/:id"
                      element={<ProducerProfile />}
                    />
                    <Route path="/clients/:id" element={<ClientProfile />} />
                    <Route
                      path="/producers/profile/:id"
                      element={<EditProfileProducer />}
                    />
                    <Route path="/createProduct" element={<CreateProduct />} />
                    <Route path="/carts/:id" element={<Cart />} />
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </React.Suspense>
              </Col>
            </Row>
            {!invalidPage && <Footer />}
          </Container>
        </CartProvider>
      </UserProvider>
    </div>
  );
}
