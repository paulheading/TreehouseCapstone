import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  firstTime,
  currentUser,
  savedFilms,
  blackList,
} from "../../../actions";

function LogoutAccountButton({
  firstTime,
  currentUser,
  savedFilms,
  blackList,
}) {
  return (
    <Link to="/">
      <Button
        variant="outline-primary"
        size="md"
        onClick={() => {
          firstTime(false);
          currentUser(null);
          savedFilms([]);
          blackList([]);
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
  currentUser,
  savedFilms,
  blackList,
})(LogoutAccountButton);
