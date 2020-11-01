import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { firstTime, currentUser } from "../../../actions";

function LogoutAccountButton({
  firstTime,
  currentUser,
  setSavedFilms,
  setBlackLists,
}) {
  return (
    <Link to="/">
      <Button
        variant="outline-primary"
        size="md"
        onClick={() => {
          currentUser(null);
          setSavedFilms(null);
          setBlackLists(null);
          firstTime(false);
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

export default connect(mapStateToProps, { firstTime, currentUser })(
  LogoutAccountButton
);
