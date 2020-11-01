import React from "react";
import { connect, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { SaveButton } from "../Buttons";
import { applyClass } from "../../modules/helpers";
import PropTypes from "prop-types";
import "./FilmResults.scss";

function FilmResults({
  savedFilms,
  blackLists,
  resultSaved,
  setSavedFilms,
  setBlackLists,
  setResultSaved,
}) {
  const filmResult = useSelector((state) => state.filmResult);

  return (
    <Card className={`film-result ${applyClass(resultSaved, "saved")}`}>
      <SaveButton
      // savedFilms={savedFilms}
      // blackLists={blackLists}
      // resultSaved={resultSaved}
      // setSavedFilms={setSavedFilms}
      // setBlackLists={setBlackLists}
      // setResultSaved={setResultSaved}
      />
      <Card.Header className="film-result">
        <h1 className="film-result title">{filmResult.Title}</h1>
        <p className="film-result year">{filmResult.Year}</p>
      </Card.Header>
      <Card.Body className="film-result">
        <div className="film-result plot">{filmResult.Plot}</div>
      </Card.Body>
    </Card>
  );
}

FilmResults.propTypes = {
  film: PropTypes.object,
  savedFilms: PropTypes.array,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(FilmResults);
