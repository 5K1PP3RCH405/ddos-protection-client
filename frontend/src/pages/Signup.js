import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaShieldAlt } from 'react-icons/fa';
import { signup } from '../api';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== confirmEmail) {
      setError('Emails do not match.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await signup({ name, email, password });
      setError('Token sent, check your email');
      navigate('/verify-email', { state: { email } });
    } catch (err) {
      setError(err.message || 'An error occurred during signup.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col md={6} className="d-none d-md-block p-0">
          <div className="signup-hero" style={{
            backgroundImage: "url('https://source.unsplash.com/random/1200x900?technology')",
            backgroundSize: 'cover',
            height: '100vh'
          }}></div>
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Card className="signup-card fade-in shadow" style={{ width: '100%', maxWidth: '400px' }}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <FaShieldAlt size={50} className="text-primary" />
                <h2 className="mt-2">Create an Account</h2>
              </div>
              {error && <Alert variant={error.includes('Token sent') ? 'success' : 'danger'}>{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FaEnvelope className="me-2" />Confirm Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
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
                <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isLoading}>
                  {isLoading ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center bg-light">
              Already have an account? <Link to="/login">Sign In</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
