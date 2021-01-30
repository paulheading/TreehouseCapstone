import React from "react";
import { connect, useSelector } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";
import { AlbumResults, FilmResults } from "../../Results";
import { SearchMessage, SearchLoading } from "../index";

function SearchResults() {
  const state = {
    firstTime: useSelector((state) => state.firstTime),
    filmResult: useSelector((state) => state.filmResult),
    albumResults: useSelector((state) => state.albumResults),
    loadingResult: useSelector((state) => state.loadingResult),
  };

  function printResults() {
    if (state.loadingResult) {
      return <SearchLoading />;
    } else {
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
  }

  return (
    <Container className="search-results">
      {state.firstTime ? <SearchMessage /> : printResults()}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SearchResults);
