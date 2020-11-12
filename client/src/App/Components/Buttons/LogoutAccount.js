import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  firstTime,
  currentUser,
  savedFilms,
  blackList,
  resultSaved,
} from "../../../actions";

function LogoutAccountButton({
  firstTime,
  resultSaved,
  currentUser,
  savedFilms,
  blackList,
  customSearch,
}) {
  const store = {
    searchQuery: useSelector((state) => state.searchQuery),
  };
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
          blackList([]);
          customSearch(store.searchQuery, null);
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
  blackList,
})(LogoutAccountButton);
