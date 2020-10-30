import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function LogoutAccountButton({
  setCurrentUser,
  setSavedFilms,
  setBlackLists,
  setIsFirstTime,
}) {
  return (
    <Link to="/">
      <Button
        variant="outline-primary"
        size="md"
        onClick={() => {
          setCurrentUser(null);
          setSavedFilms(null);
          setBlackLists(null);
          setIsFirstTime(false);
        }}
      >
        Log Out
      </Button>
    </Link>
  );
}
