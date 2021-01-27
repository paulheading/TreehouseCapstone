import React from "react";
import { connect, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { delRoute } from "../../modules/helpers";
import { RemoveIcon } from "../Icons";
import { savedFilms, blacklist, resultSaved } from "../../../actions";

function RemoveSavedButton({
  id,
  savedFilms,
  searchTerm,
  resultSaved,
  blacklist,
}) {
  const state = {
    savedFilms: useSelector((state) => state.savedFilms),
    blacklist: useSelector((state) => state.blacklist),
  };

  function doRemove() {
    delRoute("saved", id);
    resultSaved(false);
    if (state.blacklist) {
      state.blacklist.forEach((value) => {
        if (value.searchTerm === searchTerm) {
          delRoute("blacklist", value.albumId);
        }
      });
      blacklist(
        state.blacklist.filter((value) => {
          return value.searchTerm !== searchTerm;
        })
      );
    }
    savedFilms(
      state.savedFilms.filter((value) => {
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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { savedFilms, blacklist, resultSaved })(
  RemoveSavedButton
);
