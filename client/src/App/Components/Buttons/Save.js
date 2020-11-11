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
  const searchQuery = useSelector((state) => state.searchQuery);
  const currentUser = useSelector((state) => state.currentUser);
  const filmsSaved = useSelector((state) => state.savedFilms);

  const store = {
    blackList: useSelector((state) => state.blackList),
    resultSaved: useSelector((state) => state.resultSaved),
  };

  async function saveFilm(id = "") {
    if (currentUser) {
      if (store.resultSaved) {
        filmsSaved.forEach((value) => {
          if (value.searchTerm === searchQuery) {
            delRoute("saved", value.id);
            id = value.id;
          }
        });
        if (store.blackList) {
          store.blackList.forEach((value) => {
            if (value.searchTerm === searchQuery) {
              delRoute("blacklist", value.albumId);
            }
          });
          blackList(
            store.blackList.filter((value) => {
              return value.searchTerm !== searchQuery;
            })
          );
        }
        savedFilms(
          filmsSaved.filter((value) => {
            return value.id !== id;
          })
        );
        resultSaved(false);
      } else {
        createRoute("saved", {
          userId: currentUser.id,
          searchQuery,
        });
        savedFilms(await getRoute("saved", currentUser.id));
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
