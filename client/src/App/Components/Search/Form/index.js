import React, { useState, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import {
  filmResult,
  albumResults,
  searchQuery,
  resultSaved,
  firstTime,
  loadingResult,
} from "../../../../actions";
import { isSaved } from "../../../modules/helpers";
import { getOMDBData, getSpotifyData } from "../../../modules/search";

function SearchForm({
  firstTime,
  filmResult,
  albumResults,
  resultSaved,
  searchQuery,
  loadingResult,
}) {
  const [search, setSearch] = useState(null);
  const searchBtn = useRef(null);

  const state = {
    searchQuery: useSelector((state) => state.searchQuery),
    currentUser: useSelector((state) => state.currentUser),
    filmsSaved: useSelector((state) => state.savedFilms),
    firstTime: useSelector((state) => state.firstTime),
    blacklist: useSelector((state) => state.blacklist),
  };

  async function doSubmit(e) {
    e.preventDefault();

    searchQuery(search);
    loadingResult(true);
    firstTime(false);

    albumResults(await getSpotifyData(search, state.blacklist));
    filmResult(await getOMDBData(search));

    if (state.currentUser) {
      isSaved(state.filmsSaved, search)
        ? resultSaved(true)
        : resultSaved(false);
    } else {
      resultSaved(false);
    }

    loadingResult(false);
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

export default connect(mapStateToProps, {
  filmResult,
  albumResults,
  searchQuery,
  resultSaved,
  firstTime,
  loadingResult,
})(SearchForm);
