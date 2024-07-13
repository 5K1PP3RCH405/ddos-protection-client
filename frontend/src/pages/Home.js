import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaShieldAlt, FaChartLine, FaBolt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold">Protect Your Website from DDoS Attacks</h1>
              <p className="lead">Our advanced DDoS protection service keeps your online presence safe and your business running smoothly.</p>
              <Link to="/signup">
                <Button variant="light" size="lg" className="mt-3">Get Started</Button>
              </Link>
            </Col>
            <Col md={6} className="d-none d-md-block">
              <img src="https://cdn.pixabay.com/photo/2023/05/26/00/23/hacker-8018467_960_720.png" alt="DDoS Protection" className="img-fluid rounded shadow" />
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-5">Why Choose Our DDoS Protection?</h2>
        <Row>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center">
                <FaShieldAlt size={50} className="text-primary mb-3" />
                <Card.Title>Advanced Protection</Card.Title>
                <Card.Text className="text-center">
                  Our state-of-the-art technology detects and mitigates DDoS attacks in real-time.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center">
                <FaChartLine size={50} className="text-primary mb-3" />
                <Card.Title>Detailed Analytics</Card.Title>
                <Card.Text className="text-center">
                  Get comprehensive insights into your traffic and threat landscape.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center">
                <FaBolt size={50} className="text-primary mb-3" />
                <Card.Title>Fast Performance</Card.Title>
                <Card.Text className="text-center">
                  Our solution ensures minimal latency while providing maximum protection.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;