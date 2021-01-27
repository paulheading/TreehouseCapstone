import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getSpotifyData, getOMDBData } from "../../modules/search";
import {
  firstTime,
  currentUser,
  savedFilms,
  blacklist,
  resultSaved,
  albumResults,
  filmResult,
} from "../../../actions";

function LogoutAccountButton({
  firstTime,
  currentUser,
  savedFilms,
  blacklist,
  resultSaved,
  albumResults,
  filmResult,
}) {
  const state = {
    searchQuery: useSelector((state) => state.searchQuery),
  };

  async function doLogout() {
    const get = {
      film: await getOMDBData(state.searchQuery),
      albums: await getSpotifyData(state.searchQuery),
    };
    firstTime(false);
    resultSaved(false);
    currentUser(null);
    savedFilms([]);
    blacklist([]);
    albumResults(get.albums);
    filmResult(get.film);
  }

  return (
    <Link to="/">
      <Button variant="outline-primary" size="md" onClick={doLogout}>
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
  blacklist,
  resultSaved,
  albumResults,
  filmResult,
})(LogoutAccountButton);
