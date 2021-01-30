import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AboutButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/about");
  }
  return (
    <Button variant="link" size="lg" onClick={handleClick}>
      About
    </Button>
  );
}
