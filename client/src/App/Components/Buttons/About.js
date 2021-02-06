import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AboutButton() {
  const history = useHistory();
  return (
    <Button variant="link" size="lg" onClick={() => history.push("/about")}>
      About
    </Button>
  );
}
