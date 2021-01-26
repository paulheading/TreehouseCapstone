import React from "react";
import { connect, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { SaveButton } from "../../Buttons";
import { applyClass } from "../../../modules/helpers";

function FilmResults() {
  const state = {
    filmResult: useSelector((state) => state.filmResult),
    resultSaved: useSelector((state) => state.resultSaved),
  };

  return (
    <Card className={`film-result ${applyClass(state.resultSaved, "saved")}`}>
      <SaveButton />
      <Card.Header className="film-result">
        <h1 className="film-result title">{state.filmResult.Title}</h1>
        <p className="film-result year">{state.filmResult.Year}</p>
      </Card.Header>
      <Card.Body className="film-result">
        <div className="film-result plot">{state.filmResult.Plot}</div>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(FilmResults);
