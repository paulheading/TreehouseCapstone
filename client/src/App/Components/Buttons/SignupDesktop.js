import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function SignupDesktopButton({ currentUser }) {
  return !currentUser ? (
    <Link to="/signup" className="signup-link">
      <Button variant="outline-primary" size="lg">
        Sign up
      </Button>
    </Link>
  ) : null;
}
