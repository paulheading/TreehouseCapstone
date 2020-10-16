import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { BlockLogo } from "../Logos/Logos";
import { spinMe } from "../../modules/animations";
import { HelpButton } from "../Buttons/Buttons";
import "./Start.scss";

export default function Start({ setIsAboutOpen }) {
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
        <HelpButton setIsAboutOpen={setIsAboutOpen} />
        <BlockLogo />
        <Button variant="light" size="md" href={siteUrl}>
          Start
        </Button>
      </div>
    </Container>
  );
}
