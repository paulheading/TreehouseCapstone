import React, { useCallback } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SaveIcon } from "../Icons/Icons";
import { createRoute, getRoute, delRoute } from "../../modules/helpers";

function SaveButton({
  savedFilms,
  blackLists,
  resultSaved,
  setSavedFilms,
  setBlackLists,
  setResultSaved,
}) {
  const history = useHistory();
  const openLogin = useCallback(() => history.push("/login"), [history]);
  const searchQuery = useSelector((state) => state.searchQuery);
  const currentUser = useSelector((state) => state.currentUser);

  async function saveFilm(id = "") {
    if (currentUser) {
      if (resultSaved) {
        savedFilms.forEach((value) => {
          if (value.searchTerm === searchQuery) {
            delRoute("saved", value.id);
            id = value.id;
          }
        });
        if (blackLists) {
          blackLists.forEach((value) => {
            if (value.searchTerm === searchQuery) {
              delRoute("blacklist", value.albumId);
            }
          });
          setBlackLists(
            blackLists.filter((value) => {
              return value.searchTerm !== searchQuery;
            })
          );
        }
        setSavedFilms(
          savedFilms.filter((value) => {
            return value.id !== id;
          })
        );
        setResultSaved(false);
      } else {
        createRoute("saved", {
          userId: currentUser.id,
          searchQuery,
        });
        setSavedFilms(await getRoute("saved", currentUser.id));
        setResultSaved(true);
      }
    } else {
      openLogin();
    }
  }
  return (
    <Button variant="link" className="save-film" onClick={saveFilm}>
      <SaveIcon resultSaved={resultSaved} />
    </Button>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SaveButton);
