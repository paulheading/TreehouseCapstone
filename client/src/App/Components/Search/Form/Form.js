import React, { useState, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { searchQuery, resultSaved } from "../../../../actions";
import { isSaved } from "../../../modules/helpers";
import "./Form.scss";

function SearchForm({ doSearch, resultSaved, searchQuery }) {
  const [search, setSearch] = useState(null);
  const searchBtn = useRef(null);

  const store = {
    searchQuery: useSelector((state) => state.searchQuery),
    currentUser: useSelector((state) => state.currentUser),
    filmsSaved: useSelector((state) => state.savedFilms),
  };

  function doSubmit() {
    searchQuery(search);
    doSearch(search);

    if (store.currentUser) {
      if (isSaved(store.filmsSaved, search)) {
        resultSaved(true);
      } else {
        resultSaved(false);
      }
    } else {
      resultSaved(false);
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

export default connect(mapStateToProps, { searchQuery, resultSaved })(
  SearchForm
);
