import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function LoginMobileButton() {
  const currentUser = useSelector((state) => state.currentUser);
  function isCurrentUser() {
    if (currentUser) {
      return (
        <Link to="/account" className="account-link">
          <Button variant="link" size="lg">
            Account
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
  return isCurrentUser(currentUser);
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LoginMobileButton);
