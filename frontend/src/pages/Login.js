import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLock, FaUser, FaShieldAlt } from 'react-icons/fa';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Login attempt with:', { identifier, password });
    // For demonstration, let's set an error
    setError('Invalid credentials. Please try again.');
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col md={6} className="d-none d-md-block p-0">
          <div className="login-hero" style={{
            backgroundImage: "url('https://source.unsplash.com/random/1200x900?security')",
            backgroundSize: 'cover',
            height: '100vh'
          }}></div>
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Card className="login-card fade-in shadow" style={{ width: '100%', maxWidth: '400px' }}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <FaShieldAlt size={50} className="text-primary" />
                <h2 className="mt-2">Welcome Back</h2>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label><FaUser className="me-2" />Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FaLock className="me-2" />Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Sign In
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
            <Card.Footer className="text-center bg-light">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;