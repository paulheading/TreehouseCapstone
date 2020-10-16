import React from "react";
import { Button } from "react-bootstrap";
import { isSaved, createRoute, getRoute } from "../../modules/helpers";
import { RemoveIcon } from "../Icons/Icons";

export default function RemoveResult({
  id,
  currentUser,
  savedFilms,
  searchTerm,
  setAlbums,
  setSavedFilms,
  setBlackLists,
  setIsLoginOpen,
  setResultSaved,
}) {
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
      setIsLoginOpen(true);
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
