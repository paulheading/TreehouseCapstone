import React, { useState, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { searchQuery } from "../../../../actions";
import { isSaved } from "../../../modules/helpers";
import "./Form.scss";

function SearchForm({ savedFilms, doSearch, setResultSaved, searchQuery }) {
  const [search, setSearch] = useState(null);
  const searchBtn = useRef(null);
  const currentUser = useSelector((state) => state.currentUser);

  function doSubmit(e) {
    doSearch(search);
    searchQuery(search);

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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { searchQuery })(SearchForm);
