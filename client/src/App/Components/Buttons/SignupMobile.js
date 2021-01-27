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

function SignupMobileButton({
  firstTime,
  currentUser,
  savedFilms,
  blacklist,
  resultSaved,
  albumResults,
  filmResult,
}) {
  const state = {
    currentUser: useSelector((state) => state.currentUser),
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

  function ifCurrentUser() {
    if (state.currentUser) {
      return (
        <Link to="/" className="signup-link">
          <Button variant="outline-primary" size="lg" onClick={doLogout}>
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
  return ifCurrentUser();
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
})(SignupMobileButton);
