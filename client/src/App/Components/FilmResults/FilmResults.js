import React from "react";
import { Card } from "react-bootstrap";
import { applyClass } from "../../modules/helpers";
import { SaveButton } from "../Buttons/Index";
import PropTypes from "prop-types";
import "./FilmResults.scss";

export default function FilmResults({
  film,
  currentUser,
  searchTerm,
  savedFilms,
  blackLists,
  resultSaved,
  setSavedFilms,
  setBlackLists,
  setResultSaved,
}) {
  return (
    <Card className={`film-result ${applyClass(resultSaved, "saved")}`}>
      <SaveButton
        currentUser={currentUser}
        savedFilms={savedFilms}
        searchTerm={searchTerm}
        blackLists={blackLists}
        resultSaved={resultSaved}
        setSavedFilms={setSavedFilms}
        setBlackLists={setBlackLists}
        setResultSaved={setResultSaved}
      />
      <Card.Header className="film-result">
        <h1 className="film-result title">{film.Title}</h1>
        <p className="film-result year">{film.Year}</p>
      </Card.Header>
      <Card.Body className="film-result">
        <div className="film-result plot">{film.Plot}</div>
      </Card.Body>
    </Card>
  );
}

FilmResults.propTypes = {
  film: PropTypes.object,
  currentUser: PropTypes.object,
  searchTerm: PropTypes.string,
  savedFilms: PropTypes.array,
};
