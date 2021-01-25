import React from "react";
import { connect, useSelector } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";
import AlbumResults from "../../AlbumResults";
import FilmResults from "../../FilmResults";
import { SearchMessage } from "../index";

function SearchResults() {
  const state = {
    justArrived: useSelector((state) => state.justArrived),
    filmResult: useSelector((state) => state.filmResult),
    albumResults: useSelector((state) => state.albumResults),
  };

  function printResults() {
    if (state.filmResult) {
      if (!state.filmResult.Error) {
        if (state.albumResults.length > 0) {
          return (
            <div>
              <FilmResults />
              <AlbumResults />
            </div>
          );
        } else {
          return (
            <div>
              <FilmResults />
              <ListGroup variant="primary" className="not-found">
                <ListGroup.Item>No Albums Found ?!</ListGroup.Item>
              </ListGroup>
            </div>
          );
        }
      } else {
        return (
          <ListGroup variant="primary" className="not-found">
            <ListGroup.Item>{state.filmResult.Error}</ListGroup.Item>
          </ListGroup>
        );
      }
    } else {
      return "no film result";
    }
  }

  return (
    <Container className="search-results">
      {state.justArrived ? <SearchMessage /> : printResults()}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SearchResults);
