import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaShieldAlt } from 'react-icons/fa';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement password reset logic here
    console.log('Password reset requested for:', email);
    // For demonstration, let's set a success message
    setIsSuccess(true);
    setMessage('Password reset link has been sent to your email.');
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col md={6} className="d-none d-md-block p-0">
          <div className="forgot-password-hero" style={{
            backgroundImage: "url('https://source.unsplash.com/random/1200x900?password')",
            backgroundSize: 'cover',
            height: '100vh'
          }}></div>
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Card className="forgot-password-card fade-in shadow" style={{ width: '100%', maxWidth: '400px' }}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <FaShieldAlt size={50} className="text-primary" />
                <h2 className="mt-2">Forgot Password</h2>
              </div>
              {message && <Alert variant={isSuccess ? 'success' : 'danger'}>{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label><FaEnvelope className="me-2" />Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Reset Password
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/login">Back to Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;