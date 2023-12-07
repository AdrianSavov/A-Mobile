import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFoundPage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <h1 className="display-1">404</h1>
          <h2 className="display-2">Page Not Found</h2>
          <p className="lead">
            Oops! The page you are looking for might be in another galaxy.
          </p>
        </Col>
      </Row>
      <div className="home-btn">
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    </Container>
  );
};

export default NotFoundPage;
