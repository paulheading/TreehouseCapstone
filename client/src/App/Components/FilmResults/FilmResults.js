import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import {
  createRoute,
  getRoute,
  isSaved,
  applyClass,
} from "../../modules/helpers";
import { animateHeart } from "../../modules/animations";
import { HeartIcon } from "../SvgIcon/SvgIcon";
import "./FilmResults.scss";

export default function FilmResults({
  film,
  currentUser,
  searchTerm,
  savedFilms,
  setIsLoginOpen,
  setSavedFilms,
}) {
  const saveBtn = useRef(null);
  return (
    <Card
      className={`film-result ${applyClass(
        isSaved(savedFilms, searchTerm),
        "saved"
      )}`}
    >
      <Button
        ref={saveBtn}
        variant="link"
        className="save-film"
        onClick={async () => {
          if (currentUser) {
            if (!isSaved(savedFilms, searchTerm)) {
              createRoute("saved", {
                userId: currentUser.id,
                searchTerm,
              });
              setSavedFilms(await getRoute("saved", currentUser.id));
              animateHeart(saveBtn.current);
            }
          } else {
            setIsLoginOpen(true);
          }
        }}
      >
        <HeartIcon saved={isSaved(savedFilms, searchTerm)} />
      </Button>
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
