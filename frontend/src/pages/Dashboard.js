import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Table } from 'react-bootstrap';
import { FaShieldAlt, FaUser, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [protectionStatus, setProtectionStatus] = useState(true);
  const [trafficData, setTrafficData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Traffic (GB)',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  const toggleProtection = () => {
    setProtectionStatus(!protectionStatus);
  };

  return (
    <div className="dashboard fade-in">
      <h1 className="mb-4">Dashboard</h1>
      <Row>
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h3 className="card-title"><FaShieldAlt className="me-2" />Protection Status</h3>
              <p className={`status ${protectionStatus ? 'text-success' : 'text-danger'}`}>
                {protectionStatus ? 'Active' : 'Inactive'}
              </p>
              <Button onClick={toggleProtection} variant={protectionStatus ? 'outline-danger' : 'outline-success'}>
                {protectionStatus ? 'Deactivate' : 'Activate'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h3 className="card-title"><FaUser className="me-2" />Profile</h3>
              <p><strong>Username:</strong> JohnDoe</p>
              <p><strong>Email:</strong> john@example.com</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h3 className="card-title"><FaChartLine className="me-2" />Traffic</h3>
              <p><strong>Today:</strong> 1.5 GB</p>
              <p><strong>This Month:</strong> 45 GB</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h3 className="card-title"><FaExclamationTriangle className="me-2" />Threats Blocked</h3>
              <p><strong>Today:</strong> 150</p>
              <p><strong>This Month:</strong> 3,450</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mb-4">
          <Card>
            <Card.Body>
              <h3 className="card-title">Traffic Overview</h3>
              <Line data={trafficData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h3 className="card-title">Recent Activity</h3>
              <Table hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Event</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Jul 13</td>
                    <td>DDoS Attack Prevented</td>
                  </tr>
                  <tr>
                    <td>Jul 12</td>
                    <td>Configuration Updated</td>
                  </tr>
                  <tr>
                    <td>Jul 10</td>
                    <td>New IP Whitelisted</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;