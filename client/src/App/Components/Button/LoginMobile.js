import React from "react";
import { Button } from "react-bootstrap";
import { changeNavbar } from "../../modules/animations";

export default function LoginMobile({
  currentUser,
  setIsAccountOpen,
  setIsLoginOpen,
}) {
  return (
    <Button
      className="md-down"
      variant="link"
      size="lg"
      onClick={() => {
        changeNavbar("close");
        if (currentUser) {
          setIsAccountOpen(true);
        } else {
          setIsLoginOpen(true);
        }
      }}
    >
      {currentUser ? "Account" : "Log in"}
    </Button>
  );
}
