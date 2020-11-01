import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function SignupDesktopButton() {
  const currentUser = useSelector((state) => state.currentUser);
  return !currentUser ? (
    <Link to="/signup" className="signup-link">
      <Button variant="outline-primary" size="lg">
        Sign up
      </Button>
    </Link>
  ) : null;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SignupDesktopButton);
