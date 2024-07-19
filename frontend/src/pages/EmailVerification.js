import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { verifyEmail } from '../api';

function EmailVerification() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    console.log('Current URL:', window.location.href);
    console.log('Token from URL:', token);

    if (token) {
      const handleVerification = async () => {
        setIsLoading(true);
        setError('');
        try {
          console.log('Sending verification request with token:', token);
          const response = await verifyEmail(token);
          console.log('Verification response:', response);
          setMessage('Email verified successfully! Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } catch (err) {
          console.error('Verification error:', err);
          setError(err.message || 'An error occurred during verification.');
        } finally {
          setIsLoading(false);
        }
      };
      handleVerification();
    } else {
      setMessage('Please check your email for the verification link.');
    }
  }, [token, navigate]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Email Verification</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {isLoading && <p>Verifying...</p>}
              {message && <Alert variant="info">{message}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EmailVerification;