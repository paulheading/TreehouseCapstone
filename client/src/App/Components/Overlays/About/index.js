import React from "react";
import { ExitButton } from "../../Buttons";
import { ListGroup } from "react-bootstrap";

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
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}
