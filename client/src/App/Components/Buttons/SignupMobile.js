import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  firstTime,
  currentUser,
  savedFilms,
  blacklist,
} from "../../../actions";

function SignupMobileButton({ currentUser, savedFilms, blacklist, firstTime }) {
  function ifCurrentUser(currentUser) {
    if (currentUser) {
      return (
        <Link to="/" className="signup-link">
          <Button
            variant="outline-primary"
            size="lg"
            onClick={() => {
              firstTime(false);
              currentUser(null);
              savedFilms([]);
              blacklist([]);
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

export default connect(mapStateToProps, {
  firstTime,
  currentUser,
  savedFilms,
  blacklist,
})(SignupMobileButton);
