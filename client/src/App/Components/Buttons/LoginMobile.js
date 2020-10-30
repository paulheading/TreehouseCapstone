import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function LoginMobileButton({ currentUser }) {
  function isCurrentUser(currentUser) {
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
