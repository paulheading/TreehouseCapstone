import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { BlockLogo } from "../Logo/Logo";
import { HelpIcon } from "../SvgIcon/SvgIcon";
import { spinMe } from "../../modules/animations";
import "./Start.scss";

export default function Start() {
  useEffect(() => {
    spinMe("svg.icon-help");
  });
  return (
    <Container className="start">
      <div className="start wrap">
        <HelpIcon />
        <BlockLogo />
        <Button
          variant="light"
          size="md"
          href={
            process.env.REACT_APP_ENV === "production"
              ? `${process.env.REACT_APP_SITE_URL}/login`
              : "http://localhost:5000/login"
          }
        >
          Start
        </Button>
      </div>
    </Container>
  );
}
