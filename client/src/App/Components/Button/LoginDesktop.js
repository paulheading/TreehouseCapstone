import React from "react";
import { Button } from "react-bootstrap";
import { changeNavbar } from "../../modules/animations";

export default function LoginDesktop({
  currentUser,
  setIsAccountOpen,
  setIsLoginOpen,
}) {
  return (
    <Button
      className="md-up"
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
      {currentUser ? `Hey, ${currentUser.firstName}!` : "Log in"}
    </Button>
  );
}
