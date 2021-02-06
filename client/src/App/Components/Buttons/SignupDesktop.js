import React from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function SignupDesktopButton() {
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();

  return !currentUser ? (
    <Button
      variant="outline-primary"
      size="lg"
      onClick={() => history.push("/signup")}
    >
      Sign up
    </Button>
  ) : null;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SignupDesktopButton);
