import React from "react";
import { Container, ListGroup, Spinner } from "react-bootstrap";

export default function SearchLoading() {
  return (
    <Container className="search-message">
      <ListGroup variant="primary">
        <ListGroup.Item className="search-loading">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
