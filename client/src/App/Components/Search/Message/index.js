import React from "react";
import { Container, ListGroup } from "react-bootstrap";

export default function SearchMessage() {
  return (
    <Container className="search-cta__container">
      <ListGroup variant="primary" className="not-found">
        <ListGroup.Item>
          Search for your favourite movies! You can edit results and save them
          for later.
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
