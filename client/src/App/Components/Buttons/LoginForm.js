import React, { useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { currentUser } from "../../../actions";
import { getAuthRoute, getRoute, isSaved } from "../../modules/helpers";

function LoginFormButton({
  emailAddress,
  password,
  searchTerm,
  doSearch,
  currentUser,
  setSavedFilms,
  setBlackLists,
  setResultSaved,
  setUserDenied,
}) {
  const history = useHistory();
  const closeLogin = useCallback(() => history.push("/"), [history]);

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
      currentUser(getUser);
      setSavedFilms(await getRoute("saved", getUser.id));
      setBlackLists(await getRoute("blacklist", getUser.id));
      if (isSaved(await getRoute("saved", getUser.id), searchTerm)) {
        setResultSaved(true);
      } else {
        setResultSaved(false);
      }
      closeLogin();
      doSearch(searchTerm);
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

export default connect(mapStateToProps, { currentUser })(LoginFormButton);
