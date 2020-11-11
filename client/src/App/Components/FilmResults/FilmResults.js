import React from "react";
import { connect, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { SaveButton } from "../Buttons";
import { applyClass } from "../../modules/helpers";
import "./FilmResults.scss";

function FilmResults() {
  const store = {
    filmResult: useSelector((state) => state.filmResult),
    resultSaved: useSelector((state) => state.resultSaved),
  };

  return (
    <Card className={`film-result ${applyClass(store.resultSaved, "saved")}`}>
      <SaveButton />
      <Card.Header className="film-result">
        <h1 className="film-result title">{store.filmResult.Title}</h1>
        <p className="film-result year">{store.filmResult.Year}</p>
      </Card.Header>
      <Card.Body className="film-result">
        <div className="film-result plot">{store.filmResult.Plot}</div>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(FilmResults);
