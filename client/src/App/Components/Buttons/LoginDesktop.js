import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function LoginDesktopButton({ currentUser }) {
  function ifCurrentUser(currentUser) {
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
  return ifCurrentUser(currentUser);
}
