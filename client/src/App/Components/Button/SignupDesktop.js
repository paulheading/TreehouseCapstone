import React from "react";
import { Button } from "react-bootstrap";
import { changeNavbar } from "../../modules/animations";

export default function SignupDesktop({ currentUser, setIsSignupOpen }) {
  return !currentUser ? (
    <Button
      variant="outline-primary"
      size="lg"
      onClick={() => {
        setIsSignupOpen(true);
        changeNavbar("close");
      }}
    >
      Sign up
    </Button>
  ) : null;
}
