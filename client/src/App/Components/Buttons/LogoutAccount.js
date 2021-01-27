import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  firstTime,
  currentUser,
  savedFilms,
  blacklist,
  resultSaved,
} from "../../../actions";

function LogoutAccountButton({
  firstTime,
  resultSaved,
  currentUser,
  savedFilms,
  blacklist,
}) {
  return (
    <Link to="/">
      <Button
        variant="outline-primary"
        size="md"
        onClick={() => {
          firstTime(false);
          resultSaved(false);
          currentUser(null);
          savedFilms([]);
          blacklist([]);
        }}
      >
        Log Out
      </Button>
    </Link>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  firstTime,
  resultSaved,
  currentUser,
  savedFilms,
  blacklist,
})(LogoutAccountButton);
