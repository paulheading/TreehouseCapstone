import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function SignupMobileButton({
  currentUser,
  setCurrentUser,
  setSavedFilms,
  setBlackLists,
  setIsFirstTime,
}) {
  function ifCurrentUser(currentUser) {
    if (currentUser) {
      return (
        <Link to="/" className="signup-link">
          <Button
            variant="outline-primary"
            size="lg"
            onClick={() => {
              setCurrentUser(null);
              setSavedFilms(null);
              setBlackLists(null);
              setIsFirstTime(false);
            }}
          >
            Log out
          </Button>
        </Link>
      );
    } else {
      return (
        <Link to="/signup" className="signup-link">
          <Button variant="outline-primary" size="lg">
            Sign up
          </Button>
        </Link>
      );
    }
  }
  return ifCurrentUser(currentUser);
}
