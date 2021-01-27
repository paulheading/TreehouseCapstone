import React, { useState, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import {
  filmResult,
  albumResults,
  searchQuery,
  resultSaved,
  justArrived,
} from "../../../../actions";
import { isSaved } from "../../../modules/helpers";
import { getOMDBData, getSpotifyData } from "../../../modules/search";

function SearchForm({
  justArrived,
  filmResult,
  albumResults,
  resultSaved,
  searchQuery,
}) {
  const [search, setSearch] = useState(null);
  const searchBtn = useRef(null);

  const state = {
    searchQuery: useSelector((state) => state.searchQuery),
    currentUser: useSelector((state) => state.currentUser),
    filmsSaved: useSelector((state) => state.savedFilms),
    justArrived: useSelector((state) => state.justArrived),
    blacklist: useSelector((state) => state.blacklist),
  };

  async function doSubmit(e) {
    e.preventDefault();

    searchQuery(search);
    albumResults(await getSpotifyData(search, state.blacklist));
    filmResult(await getOMDBData(search));

    if (state.justArrived) {
      justArrived(false);
    }

    if (state.currentUser) {
      if (isSaved(state.filmsSaved, search)) {
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
  justArrived,
})(SearchForm);
