import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col xs={12} md={6}>
          <div className="text-center mb-4">
            <h2>Login to Your Account</h2>
          </div>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Log In
            </Button>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <Form.Check type="checkbox" label="Remember me" />
              </div>
              <div>
                <a href="/forgot-password">Forgot Password?</a>
              </div>
            </div>

            <div className="text-center mt-4">
              <span>or</span>
            </div>

            <Button variant="outline-danger" className="w-100 mt-3" onClick={() => window.location.href = "/auth/google"}>
              <FaGoogle className="me-2" />
              Continue with Google
            </Button>

            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <a href="/signup">Sign Up</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
