import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SaveIcon } from "../Icons/Icons";
import { createRoute, getRoute, delRoute } from "../../modules/helpers";

export default function SaveButton({
  currentUser,
  savedFilms,
  searchTerm,
  blackLists,
  resultSaved,
  setSavedFilms,
  setBlackLists,
  setResultSaved,
}) {
  const history = useHistory();
  const openLogin = useCallback(() => history.push("/login"), [history]);

  async function saveFilm(id = "") {
    if (currentUser) {
      if (resultSaved) {
        savedFilms.forEach((value) => {
          if (value.searchTerm === searchTerm) {
            delRoute("saved", value.id);
            id = value.id;
          }
        });
        if (blackLists) {
          blackLists.forEach((value) => {
            if (value.searchTerm === searchTerm) {
              delRoute("blacklist", value.albumId);
            }
          });
          setBlackLists(
            blackLists.filter((value) => {
              return value.searchTerm !== searchTerm;
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
          searchTerm,
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
