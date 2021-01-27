import React, { useCallback } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  currentUser,
  savedFilms,
  blacklist,
  resultSaved,
  albumResults,
  filmResult,
} from "../../../actions";
import { getAuthRoute, getRoute, isSaved } from "../../modules/helpers";
import { getSpotifyData, getOMDBData } from "../../modules/search";

function LoginFormButton({
  emailAddress,
  password,
  currentUser,
  savedFilms,
  blacklist,
  resultSaved,
  setUserDenied,
  albumResults,
  filmResult,
}) {
  const history = useHistory();
  const closeLogin = useCallback(() => history.push("/"), [history]);

  const state = {
    searchQuery: useSelector((state) => state.searchQuery),
    blacklist: useSelector((state) => state.blacklist),
  };

  async function doLogin(e) {
    e.preventDefault();

    const get = {
      user: await getAuthRoute(
        "users",
        emailAddress.current.value,
        password.current.value
      ),
    };

    if (get.user.message) {
      setUserDenied(get.user.message);
    } else {
      get.blacklist = await getRoute("blacklist", get.user.id);
      get.savedFilms = await getRoute("saved", get.user.id);
      get.film = await getOMDBData(state.searchQuery);
      get.albums = await getSpotifyData(state.searchQuery, get.blacklist);

      currentUser(get.user);
      savedFilms(get.savedFilms);
      blacklist(get.blacklist);
      albumResults(get.albums);
      filmResult(get.film);

      isSaved(get.savedFilms, state.searchQuery)
        ? resultSaved(true)
        : resultSaved(false);

      closeLogin();
    }
  }
  return (
    <Button block size="md" variant="primary" type="submit" onClick={doLogin}>
      Log in
    </Button>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  currentUser,
  savedFilms,
  blacklist,
  resultSaved,
  albumResults,
  filmResult,
})(LoginFormButton);
