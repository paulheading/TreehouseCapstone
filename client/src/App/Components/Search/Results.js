import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import AlbumResults from "../AlbumResults/AlbumResults";
import FilmResults from "../FilmResults/FilmResults";
import PropTypes from "prop-types";
import "./Results.scss";

export default function Results({
  currentUser,
  searchTerm,
  film,
  albums,
  savedFilms,
  setAlbums,
  setBlackLists,
  setIsLoginOpen,
  setSavedFilms,
}) {
  let printResults;
  if (film) {
    if (!film.Error) {
      if (albums) {
        if (albums.length > 0) {
          printResults = (
            <div>
              <FilmResults
                film={film}
                currentUser={currentUser}
                searchTerm={searchTerm}
                savedFilms={savedFilms}
                setBlackLists={setBlackLists}
                setIsLoginOpen={setIsLoginOpen}
                setSavedFilms={setSavedFilms}
              />
              <AlbumResults
                currentUser={currentUser}
                searchTerm={searchTerm}
                albums={albums}
                savedFilms={savedFilms}
                setAlbums={setAlbums}
                setBlackLists={setBlackLists}
                setIsLoginOpen={setIsLoginOpen}
                setSavedFilms={setSavedFilms}
              />
            </div>
          );
        } else {
          printResults = (
            <div>
              <FilmResults
                film={film}
                currentUser={currentUser}
                searchTerm={searchTerm}
                savedFilms={savedFilms}
                setBlackLists={setBlackLists}
                setIsLoginOpen={setIsLoginOpen}
                setSavedFilms={setSavedFilms}
              />
              <ListGroup variant="primary" className="not-found">
                <ListGroup.Item>No Albums Found ?!</ListGroup.Item>
              </ListGroup>
            </div>
          );
        }
      } else {
        printResults = (
          <div>
            <FilmResults
              film={film}
              currentUser={currentUser}
              searchTerm={searchTerm}
              savedFilms={savedFilms}
              setBlackLists={setBlackLists}
              setIsLoginOpen={setIsLoginOpen}
              setSavedFilms={setSavedFilms}
            />
            <ListGroup variant="primary" className="not-found">
              <ListGroup.Item>No Albums Found ?!</ListGroup.Item>
            </ListGroup>
          </div>
        );
      }
    } else {
      printResults = (
        <ListGroup variant="primary" className="not-found">
          <ListGroup.Item>{film.Error}</ListGroup.Item>
        </ListGroup>
      );
    }
  }
  return <Container className="search-results">{printResults}</Container>;
}

Results.propTypes = {
  currentUser: PropTypes.object,
  searchTerm: PropTypes.string,
  film: PropTypes.object,
  albums: PropTypes.array,
  savedFilms: PropTypes.array,
};
