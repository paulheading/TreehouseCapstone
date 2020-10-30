import React from "react";
import { ExitButton, ExitArea } from "../../Buttons/Index";
import { ListGroup } from "react-bootstrap";
import "./About.scss";

export default function AboutOverlay() {
  return (
    <div className="overlay__container">
      <ExitButton />
      <div className="overlay__wrap">
        <ListGroup variant="secondary" className="about-overlay">
          <ListGroup.Item>
            <p>
              Use <strong>MovieTunes</strong> to filter and save your favourite
              soundtracks. It’s free to use, so have fun!
            </p>
            <p className="terms">
              <strong>Terms</strong>
              <br /> Requires a spotify account. MovieTunes is a personal
              project of Paul Heading.
            </p>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <ExitArea />
    </div>
  );
}
