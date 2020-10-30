import React from "react";
import { Button } from "react-bootstrap";
import { delRoute } from "../../modules/helpers";
import { RemoveIcon } from "../Icons/Icons";

export default function RemoveSavedButton({
  id,
  savedFilms,
  blackLists,
  searchTerm,
  setResultSaved,
  setBlackLists,
  setSavedFilms,
}) {
  function doRemove() {
    delRoute("saved", id);
    setResultSaved(false);
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
  }
  return (
    <Button variant="inline" onClick={doRemove}>
      <RemoveIcon variant="secondary" size="sm" />
    </Button>
  );
}
