import React, { useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { isSaved } from "../../../modules/helpers";
import "./Form.scss";

export default function SearchForm({
  currentUser,
  savedFilms,
  doSearch,
  setResultSaved,
}) {
  const [search, setSearch] = useState(null);
  const searchBtn = useRef(null);

  function doSubmit(e) {
    doSearch(search);

    if (currentUser) {
      if (isSaved(savedFilms, search)) {
        setResultSaved(true);
      } else {
        setResultSaved(false);
      }
    } else {
      setResultSaved(false);
    }
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  return (
    <Container className="search-form">
      <Form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          doSubmit();
        }}
      >
        <Form.Group>
          <Form.Control
            className="search-input"
            type="search"
            name="search"
            onChange={onSearchChange}
          />
        </Form.Group>
        <Button ref={searchBtn} block size="lg" type="submit">
          Search
        </Button>
      </Form>
    </Container>
  );
}
