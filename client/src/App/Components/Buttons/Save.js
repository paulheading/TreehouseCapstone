import React, { useCallback } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SaveIcon } from "../Icons";
import { createRoute, getRoute, delRoute } from "../../modules/helpers";
import { savedFilms, blacklist, resultSaved } from "../../../actions";

function SaveButton({ savedFilms, resultSaved, blacklist }) {
  const history = useHistory();
  const openLogin = useCallback(() => history.push("/login"), [history]);

  const state = {
    blacklist: useSelector((state) => state.blacklist),
    resultSaved: useSelector((state) => state.resultSaved),
    searchQuery: useSelector((state) => state.searchQuery),
    currentUser: useSelector((state) => state.currentUser),
    savedFilms: useSelector((state) => state.savedFilms),
  };

  async function saveFilm() {
    let id = "";
    if (state.currentUser) {
      if (state.resultSaved) {
        state.savedFilms.forEach((value) => {
          if (value.searchTerm === state.searchQuery) {
            delRoute("saved", value.id);
            id = value.id;
          }
        });
        if (state.blacklist) {
          state.blacklist.forEach((value) => {
            if (value.searchTerm === state.searchQuery) {
              delRoute("blacklist", value.albumId);
            }
          });
          blacklist(
            state.blacklist.filter((value) => {
              return value.searchTerm !== state.searchQuery;
            })
          );
        }
        savedFilms(
          state.savedFilms.filter((value) => {
            return value.id !== id;
          })
        );
        resultSaved(false);
      } else {
        createRoute("saved", {
          userId: state.currentUser.id,
          searchTerm: state.searchQuery,
        }).then(async () => {
          savedFilms(await getRoute("saved", state.currentUser.id));
          resultSaved(true);
        });
      }
    } else {
      openLogin();
    }
  }

  return (
    <Button variant="link" className="save-film" onClick={saveFilm}>
      <SaveIcon resultSaved={state.resultSaved} />
    </Button>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { savedFilms, blacklist, resultSaved })(
  SaveButton
);
