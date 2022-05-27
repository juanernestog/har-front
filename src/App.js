import React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';

const Home = React.lazy(() => import('./pages/Home'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
// const Create = React.lazy(() => import('./pages/Create'));
// const SignIn = React.lazy(() => import('./pages/SignIn'));
// const SignUp = React.lazy(() => import('./pages/SignUp'));
// const Cart = React.lazy(() => import('./pages/Cart'));
// const Checkout = React.lazy(() => import('./pages/Checkout'));

function App() {
  return (
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
                {/* <Route path="/create" element={<Create />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </React.Suspense>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
