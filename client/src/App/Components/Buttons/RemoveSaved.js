import React from "react";
import { connect, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { delRoute } from "../../modules/helpers";
import { RemoveIcon } from "../Icons/Icons";
import { savedFilms, blackList, resultSaved } from "../../../actions";

function RemoveSavedButton({
  id,
  savedFilms,
  searchTerm,
  resultSaved,
  blackList,
}) {
  const store = {
    savedFilms: useSelector((state) => state.savedFilms),
    blackList: useSelector((state) => state.blackList),
  };

  function doRemove() {
    delRoute("saved", id);
    resultSaved(false);
    if (store.blackList) {
      store.blackList.forEach((value) => {
        if (value.searchTerm === searchTerm) {
          delRoute("blacklist", value.albumId);
        }
      });
      blackList(
        store.blackList.filter((value) => {
          return value.searchTerm !== searchTerm;
        })
      );
    }
    savedFilms(
      store.savedFilms.filter((value) => {
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

export default connect(mapStateToProps, { savedFilms, blackList, resultSaved })(
  RemoveSavedButton
);
