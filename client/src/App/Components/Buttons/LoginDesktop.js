import React from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function LoginDesktopButton() {
  const currentUser = useSelector((state) => state.currentUser);
  let history = useHistory();

  function goAccount() {
    history.push("/account");
  }

  function goLogin() {
    history.push("/login");
  }

  function ifCurrentUser() {
    if (currentUser) {
      return (
        <Button variant="link" size="lg" onClick={goAccount}>
          {`Hey, ${currentUser.firstName}!`}
        </Button>
      );
    } else {
      return (
        <Button variant="link" size="lg" onClick={goLogin}>
          Log in
        </Button>
      );
    }
  }
  return ifCurrentUser();
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LoginDesktopButton);
