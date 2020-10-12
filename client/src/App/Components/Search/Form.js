import React, { useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { clearHeart } from "../../modules/animations";
import "./Form.scss";

export default function SForm({ doSearch }) {
  const [search, setSearch] = useState(null);
  const searchBtn = useRef(null);

  function doSubmit(e) {
    e.preventDefault();
    doSearch(search);
    e.currentTarget.reset();
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  return (
    <Container className="search-form">
      <Form className="search-form" onSubmit={doSubmit}>
        <Form.Group>
          <Form.Control
            className="search-input"
            type="search"
            name="search"
            onChange={onSearchChange}
          />
        </Form.Group>
        <Button
          ref={searchBtn}
          onClick={() => {
            clearHeart(searchBtn.current);
          }}
          block
          size="lg"
          type="submit"
        >
          Search
        </Button>
      </Form>
    </Container>
  );
}
