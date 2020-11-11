import React from "react";
import { connect, useSelector } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";
import AlbumResults from "../../AlbumResults/AlbumResults";
import FilmResults from "../../FilmResults/FilmResults";
import PropTypes from "prop-types";
import "./Results.scss";

function SearchResults() {
  const store = {
    filmResult: useSelector((state) => state.filmResult),
    albumResults: useSelector((state) => state.albumResults),
  };

  function printResults() {
    if (store.filmResult) {
      if (!store.filmResult.Error) {
        if (store.albumResults.length > 0) {
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
            <ListGroup.Item>{store.filmResult.Error}</ListGroup.Item>
          </ListGroup>
        );
      }
    } else {
      return "no film result";
    }
  }
  return <Container className="search-results">{printResults()}</Container>;
}

SearchResults.propTypes = {
  film: PropTypes.object,
  albums: PropTypes.array,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SearchResults);
