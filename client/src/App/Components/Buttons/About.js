import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AboutButton() {
  return (
    <Link to="/about" className="about-link">
      <Button variant="link" size="lg">
        About
      </Button>
    </Link>
  );
}
