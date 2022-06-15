import React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import { UserProvider } from './containers/UserContext';

const Home = React.lazy(() => import('./pages/Home'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
const LogIn = React.lazy(() => import('./pages/LogIn'));
const LogInClients = React.lazy(() => import('./pages/LogInClients'));
const LogInProducers = React.lazy(() => import('./pages/LogInProducers'));

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
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
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/login/clients" element={<LogInClients />} />
                  <Route path="/login/producers" element={<LogInProducers />} />
                </Routes>
              </React.Suspense>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </UserProvider>
  );
}
