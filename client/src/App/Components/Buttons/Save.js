import React, { useCallback } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SaveIcon } from "../Icons/Icons";
import { createRoute, getRoute, delRoute } from "../../modules/helpers";
import { savedFilms, blackList, resultSaved } from "../../../actions";

function SaveButton({ savedFilms, resultSaved, blackList }) {
  const history = useHistory();
  const openLogin = useCallback(() => history.push("/login"), [history]);

  const store = {
    blackList: useSelector((state) => state.blackList),
    resultSaved: useSelector((state) => state.resultSaved),
    searchQuery: useSelector((state) => state.searchQuery),
    currentUser: useSelector((state) => state.currentUser),
    savedFilms: useSelector((state) => state.savedFilms),
  };

  async function saveFilm(id = "") {
    if (store.currentUser) {
      if (store.resultSaved) {
        store.savedFilms.forEach((value) => {
          if (value.searchTerm === store.searchQuery) {
            delRoute("saved", value.id);
            id = value.id;
          }
        });
        if (store.blackList) {
          store.blackList.forEach((value) => {
            if (value.searchTerm === store.searchQuery) {
              delRoute("blacklist", value.albumId);
            }
          });
          blackList(
            store.blackList.filter((value) => {
              return value.searchTerm !== store.searchQuery;
            })
          );
        }
        savedFilms(
          store.savedFilms.filter((value) => {
            return value.id !== id;
          })
        );
        resultSaved(false);
      } else {
        console.log(store.currentUser.id, store.searchQuery);
        createRoute("saved", {
          userId: store.currentUser.id,
          searchTerm: store.searchQuery,
        });
        savedFilms(await getRoute("saved", store.currentUser.id));
        resultSaved(true);
      }
    } else {
      openLogin();
    }
  }
  return (
    <Button variant="link" className="save-film" onClick={saveFilm}>
      <SaveIcon resultSaved={store.resultSaved} />
    </Button>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { savedFilms, blackList, resultSaved })(
  SaveButton
);
