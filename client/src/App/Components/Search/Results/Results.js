import React from "react";
import { connect, useSelector } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";
import AlbumResults from "../../AlbumResults/AlbumResults";
import FilmResults from "../../FilmResults/FilmResults";
import PropTypes from "prop-types";
import "./Results.scss";

function SearchResults({
  savedFilms,
  setAlbums,
  setBlackLists,
  setSavedFilms,
  blackLists,
  resultSaved,
  setResultSaved,
}) {
  const filmResult = useSelector((state) => state.filmResult);
  const albumResults = useSelector((state) => state.albumResults);

  function printResults() {
    if (filmResult) {
      if (!filmResult.Error) {
        if (albumResults.length > 0) {
          return (
            <div>
              <FilmResults
              // savedFilms={savedFilms}
              // resultSaved={resultSaved}
              // setBlackLists={setBlackLists}
              // setSavedFilms={setSavedFilms}
              // setResultSaved={setResultSaved}
              />
              {/* <AlbumResults
                blackLists={blackLists}
                savedFilms={savedFilms}
                setAlbums={setAlbums}
                setBlackLists={setBlackLists}
                setSavedFilms={setSavedFilms}
                setResultSaved={setResultSaved}
              /> */}
            </div>
          );
        } else {
          return (
            <div>
              <FilmResults
                savedFilms={savedFilms}
                blackLists={blackLists}
                resultSaved={resultSaved}
                setResultSaved={setResultSaved}
                setBlackLists={setBlackLists}
                setSavedFilms={setSavedFilms}
              />
              <ListGroup variant="primary" className="not-found">
                <ListGroup.Item>No Albums Found ?!</ListGroup.Item>
              </ListGroup>
            </div>
          );
        }
      } else {
        return (
          <ListGroup variant="primary" className="not-found">
            <ListGroup.Item>{filmResult.Error}</ListGroup.Item>
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
  searchTerm: PropTypes.string,
  film: PropTypes.object,
  albums: PropTypes.array,
  savedFilms: PropTypes.array,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SearchResults);
