import React, { useCallback } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  currentUser,
  savedFilms,
  blackList,
  resultSaved,
} from "../../../actions";
import { getAuthRoute, getRoute, isSaved } from "../../modules/helpers";

function LoginFormButton({
  emailAddress,
  password,
  doSearch,
  currentUser,
  savedFilms,
  blackList,
  resultSaved,
  setUserDenied,
}) {
  const history = useHistory();
  const closeLogin = useCallback(() => history.push("/"), [history]);
  const store = {
    searchQuery: useSelector((state) => state.searchQuery),
  };

  async function doLogin(e) {
    e.preventDefault();
    let getUser = await getAuthRoute(
      "users",
      emailAddress.current.value,
      password.current.value
    );
    if (getUser.message) {
      setUserDenied(getUser.message);
    } else {
      const getBlackList = await getRoute("blacklist", getUser.id);
      const getSavedFilms = await getRoute("saved", getUser.id);
      currentUser(getUser);
      savedFilms(getSavedFilms);
      blackList(getBlackList);
      if (isSaved(getSavedFilms, store.searchQuery)) {
        resultSaved(true);
      } else {
        resultSaved(false);
      }
      closeLogin();
      doSearch(store.searchQuery, getBlackList);
    }
  }
  return (
    <Button
      block
      size="md"
      variant="primary"
      type="submit"
      onClick={(e) => {
        doLogin(e);
      }}
    >
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
  blackList,
  resultSaved,
})(LoginFormButton);
