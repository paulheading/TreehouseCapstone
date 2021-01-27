import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SearchIcon } from "../Icons";
import {
  albumResults,
  filmResult,
  resultSaved,
  firstTime,
  searchQuery,
} from "../../../actions";
import { getOMDBData, getSpotifyData } from "../../modules/search";

function SearchSavedButton({
  filmResult,
  albumResults,
  savedTitle,
  resultSaved,
  firstTime,
  searchQuery,
}) {
  const state = {
    firstTime: useSelector((state) => state.firstTime),
    blacklist: useSelector((state) => state.blacklist),
  };

  async function doSearch() {
    albumResults(await getSpotifyData(savedTitle, state.blacklist));
    filmResult(await getOMDBData(savedTitle));
    searchQuery(savedTitle);
    resultSaved(true);

    if (state.firstTime) {
      firstTime(false);
    }
  }

  return (
    <Link to="/" className="search-saved__link">
      <Button variant="inline" onClick={doSearch}>
        <SearchIcon variant="secondary" size="sm" />
      </Button>
    </Link>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  filmResult,
  albumResults,
  resultSaved,
  firstTime,
  searchQuery,
})(SearchSavedButton);
