import React from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function LoginDesktopButton() {
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();

  function ifCurrentUser() {
    if (currentUser) {
      return (
        <Button
          variant="link"
          size="lg"
          onClick={() => history.push("/account")}
        >
          {`Hey, ${currentUser.firstName}!`}
        </Button>
      );
    } else {
      return (
        <Button variant="link" size="lg" onClick={() => history.push("/login")}>
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
