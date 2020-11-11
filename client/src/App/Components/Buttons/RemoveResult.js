import React, { useCallback } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { RemoveIcon } from "../Icons/Icons";
import { isSaved, createRoute, getRoute } from "../../modules/helpers";
import {
  savedFilms,
  albumResults,
  blackList,
  resultSaved,
} from "../../../actions";

function RemoveResultButton({
  id,
  albumResults,
  savedFilms,
  blackList,
  resultSaved,
}) {
  const history = useHistory();
  const openLogin = useCallback(() => history.push("/login"), [history]);

  const store = {
    searchQuery: useSelector((state) => state.searchQuery),
    currentUser: useSelector((state) => state.currentUser),
    filmsSaved: useSelector((state) => state.savedFilms),
    albumResults: useSelector((state) => state.albumResults),
  };

  function filterAlbums(id) {
    return store.albumResults.filter((value) => {
      return value.id !== id ? value : false;
    });
  }

  async function removeAlbum() {
    // if the user is currently logged in
    if (store.currentUser) {
      // if there is not a "saved films" db entry for this search
      // TODO: check against store, not db
      if (!isSaved(store.filmsSaved, store.searchQuery)) {
        // create a "saved films" db entry
        createRoute("saved", {
          userId: store.currentUser.id,
          searchTerm: store.searchQuery,
        });
        // update store with latest "saved films" db entries from user
        savedFilms(await getRoute("saved", store.currentUser.id));
        // update state to reflect saved search
        resultSaved(true);
      }
      // create a "blacklist" db entry
      createRoute("blacklist", {
        userId: store.currentUser.id,
        searchTerm: store.searchQuery,
        albumId: id,
      });
      // update store with latest "blacklist" db entries from user
      blackList(await getRoute("blacklist", store.currentUser.id));
      // update front-end results minus the selected entry
      albumResults(filterAlbums(id));
    } else {
      // go to login route
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

export default connect(mapStateToProps, {
  savedFilms,
  albumResults,
  blackList,
  resultSaved,
})(RemoveResultButton);
