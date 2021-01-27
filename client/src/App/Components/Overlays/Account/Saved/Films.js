import React from "react";
import { connect, useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import AccountTable from "./Table";

function SavedFilms() {
  const state = {
    currentUser: useSelector((state) => state.currentUser),
    savedFilms: useSelector((state) => state.savedFilms),
  };
  return state.savedFilms.length > 0 ? (
    <AccountTable />
  ) : (
    <ListGroup variant="secondary">
      <ListGroup.Item>
        Use <strong>MovieTunes</strong> to save your favourite soundtracks. It’s
        free to use, so have fun!
      </ListGroup.Item>
    </ListGroup>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SavedFilms);
