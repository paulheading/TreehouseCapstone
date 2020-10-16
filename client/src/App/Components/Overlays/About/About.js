import React from "react";
import "./About.scss";
import { ListGroup } from "react-bootstrap";
import { RemoveIcon } from "../../Icons/Icons";

export default function About({ setIsAboutOpen }) {
  return (
    <div className="about-overlay__container">
      <div
        className="about-overlay__exit-icon"
        onClick={() => {
          setIsAboutOpen(false);
        }}
      >
        <RemoveIcon variant="secondary" />
      </div>
      <div className="about-overlay__wrap">
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
      <div
        className="about-overlay__exit"
        onClick={() => {
          setIsAboutOpen(false);
        }}
      ></div>
    </div>
  );
}
