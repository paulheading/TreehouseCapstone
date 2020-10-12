import React from "react";
import { Button, Container } from "react-bootstrap";
import { BlockLogo } from "../Logo/Logo";
import "./Start.scss";

export default function Start() {
  return (
    <Container className="start">
      <div className="start wrap">
        <BlockLogo />
        <Button variant="light" href="http://localhost:5000/login">
          Start
        </Button>
      </div>
    </Container>
  );
}
