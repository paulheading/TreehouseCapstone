import React from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { RemoveIcon } from "../Icons";
import { isSaved, createRoute, getRoute } from "../../modules/helpers";
import {
  savedFilms,
  albumResults,
  blacklist,
  resultSaved,
} from "../../../actions";

function RemoveResultButton({
  id,
  albumResults,
  savedFilms,
  blacklist,
  resultSaved,
}) {
  const history = useHistory();
  const state = {
    searchQuery: useSelector((state) => state.searchQuery),
    currentUser: useSelector((state) => state.currentUser),
    filmsSaved: useSelector((state) => state.savedFilms),
    albumResults: useSelector((state) => state.albumResults),
  };

  function filterAlbums(id) {
    return state.albumResults.filter((value) => {
      return value.id !== id ? value : false;
    });
  }

  async function removeAlbum() {
    // if the user is currently logged in
    if (state.currentUser) {
      // if there is not a "saved films" db entry for this search
      // TODO: check against store, not db
      if (!isSaved(state.filmsSaved, state.searchQuery)) {
        // create a "saved films" db entry
        createRoute("saved", {
          userId: state.currentUser.id,
          searchTerm: state.searchQuery,
        });
        // update store with latest "saved films" db entries from user
        savedFilms(await getRoute("saved", state.currentUser.id));
        // update state to reflect saved search
        resultSaved(true);
      }
      // create a "blacklist" db entry
      createRoute("blacklist", {
        userId: state.currentUser.id,
        searchTerm: state.searchQuery,
        albumId: id,
      });
      // update store with latest "blacklist" db entries from user
      blacklist(await getRoute("blacklist", state.currentUser.id));
      // update front-end results minus the selected entry
      albumResults(filterAlbums(id));
    } else {
      // go to login route
      history.push("/login");
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
  blacklist,
  resultSaved,
})(RemoveResultButton);
