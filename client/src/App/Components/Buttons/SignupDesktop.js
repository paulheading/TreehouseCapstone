import React from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function SignupDesktopButton() {
  const currentUser = useSelector((state) => state.currentUser);
  let history = useHistory();

  function goSignup() {
    history.push("/signup");
  }

  return !currentUser ? (
    <Button variant="outline-primary" size="lg" onClick={goSignup}>
      Sign up
    </Button>
  ) : null;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SignupDesktopButton);
