import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = (props) => {
  return (
    <Container>
      <h1 className="mt-4 mb-4">Dashboard</h1>
        <p>Hello, {props.user.firstName}</p>
      <Row>
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Widget 1</Card.Title>
              <Card.Text>Content for Widget 1.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Widget 2</Card.Title>
              <Card.Text>Content for Widget 2.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Widget 3</Card.Title>
              <Card.Text>Content for Widget 3.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Large Widget</Card.Title>
              <Card.Text>Content for a larger widget or chart.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
