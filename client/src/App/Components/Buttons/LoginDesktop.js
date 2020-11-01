import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function LoginDesktopButton() {
  const currentUser = useSelector((state) => state.currentUser);
  function ifCurrentUser() {
    if (currentUser) {
      return (
        <Link to="/account" className="account-link">
          <Button variant="link" size="lg">
            {`Hey, ${currentUser.firstName}!`}
          </Button>
        </Link>
      );
    } else {
      return (
        <Link to="/login" className="login-link">
          <Button variant="link" size="lg">
            Log in
          </Button>
        </Link>
      );
    }
  }
  return ifCurrentUser();
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LoginDesktopButton);
