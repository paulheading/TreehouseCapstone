import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SearchIcon } from "../Icons";
import {
  albumResults,
  filmResult,
  resultSaved,
  justArrived,
} from "../../../actions";
import { getOMDBData, getSpotifyData } from "../../modules/search";

function SearchSavedButton({
  filmResult,
  albumResults,
  savedTitle,
  resultSaved,
  justArrived,
}) {
  const state = {
    justArrived: useSelector((state) => state.justArrived),
  };

  async function doSearch() {
    albumResults(await getSpotifyData(savedTitle));
    filmResult(await getOMDBData(savedTitle));
    resultSaved(true);

    if (state.justArrived) {
      justArrived(false);
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
  justArrived,
})(SearchSavedButton);
