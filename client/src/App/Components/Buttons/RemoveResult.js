import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { isSaved, createRoute, getRoute } from "../../modules/helpers";
import { RemoveIcon } from "../Icons/Icons";

export default function RemoveResultButton({
  id,
  currentUser,
  savedFilms,
  searchTerm,
  setAlbums,
  setSavedFilms,
  setBlackLists,
  setResultSaved,
}) {
  const history = useHistory();
  const openLogin = useCallback(() => history.push("/login"), [history]);

  async function removeAlbum() {
    if (currentUser) {
      if (!isSaved(savedFilms, searchTerm)) {
        createRoute("saved", {
          userId: currentUser.id,
          searchTerm,
        });
        setSavedFilms(await getRoute("saved", currentUser.id));
        setResultSaved(true);
      }
      createRoute("blacklist", {
        userId: currentUser.id,
        searchTerm,
        albumId: id,
      });
      setBlackLists(await getRoute("blacklist", currentUser.id));
      setAlbums(id);
    } else {
      openLogin();
    }
  }
  return (
    <Button
      variant="link"
      className="remove-album"
      onClick={removeAlbum}
      inline="true"
    >
      <RemoveIcon />
    </Button>
  );
}
