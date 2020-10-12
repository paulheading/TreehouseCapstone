import React from "react";
import { Button } from "react-bootstrap";
import { changeNavbar } from "../../modules/animations";

export default function SignupMobile({
  currentUser,
  setCurrentUser,
  setSavedFilms,
  setBlackLists,
  setIsFirstTime,
  setIsSignupOpen,
}) {
  return (
    <Button
      className="md-down"
      variant="outline-primary"
      size="lg"
      onClick={() => {
        changeNavbar("close");
        if (currentUser) {
          setCurrentUser(null);
          setSavedFilms(null);
          setBlackLists(null);
          setIsFirstTime(false);
        } else {
          setIsSignupOpen(true);
        }
      }}
    >
      {currentUser ? "Log out" : "Sign up"}
    </Button>
  );
}
