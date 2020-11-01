import React, { useCallback } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { isSaved, createRoute, getRoute } from "../../modules/helpers";
import { RemoveIcon } from "../Icons/Icons";

function RemoveResultButton({
  id,
  savedFilms,
  searchTerm,
  setAlbums,
  setSavedFilms,
  setBlackLists,
  setResultSaved,
}) {
  const history = useHistory();
  const openLogin = useCallback(() => history.push("/login"), [history]);
  const currentUser = useSelector((state) => state.currentUser);

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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(RemoveResultButton);
