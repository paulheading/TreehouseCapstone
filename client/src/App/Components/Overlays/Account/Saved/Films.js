import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import AccountTable from "./Table";
import { getRoute } from "../../../../modules/helpers";
import { savedFilms } from "../../../../../actions";

function SavedFilms({ savedFilms }) {
  const state = {
    currentUser: useSelector((state) => state.currentUser),
    justArrived: useSelector((state) => state.justArrived),
    savedFilms: useSelector((state) => state.savedFilms),
  };

  useEffect(() => {
    (async () => {
      savedFilms(await getRoute("saved", state.currentUser.id));
    })();
  }, [savedFilms, state.currentUser.id]);

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

export default connect(mapStateToProps, { savedFilms })(SavedFilms);
