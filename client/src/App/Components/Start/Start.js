import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { BlockLogo } from "../Logos/Index";
import { spinMe } from "../../modules/animations";
import { HelpButton } from "../Buttons/Index";
import "./Start.scss";

export default function Start() {
  useEffect(() => {
    spinMe("svg.icon-help");
  });

  const siteUrl =
    process.env.REACT_APP_ENV === "production"
      ? `${process.env.REACT_APP_SITE_URL}/login`
      : "http://localhost:5000/login";

  return (
    <Container className="start">
      <div className="start wrap">
        <HelpButton />
        <BlockLogo />
        <Button variant="light" size="md" href={siteUrl}>
          Start
        </Button>
      </div>
    </Container>
  );
}
