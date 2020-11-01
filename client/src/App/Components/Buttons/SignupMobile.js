import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { firstTime, currentUser } from "../../../actions";

function SignupMobileButton({
  currentUser,
  setSavedFilms,
  setBlackLists,
  firstTime,
}) {
  function ifCurrentUser(currentUser) {
    if (currentUser) {
      return (
        <Link to="/" className="signup-link">
          <Button
            variant="outline-primary"
            size="lg"
            onClick={() => {
              currentUser(null);
              setSavedFilms(null);
              setBlackLists(null);
              firstTime(false);
            }}
          >
            Log out
          </Button>
        </Link>
      );
    } else {
      return (
        <Link to="/signup" className="signup-link">
          <Button variant="outline-primary" size="lg">
            Sign up
          </Button>
        </Link>
      );
    }
  }
  return ifCurrentUser(currentUser);
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { firstTime, currentUser })(
  SignupMobileButton
);
