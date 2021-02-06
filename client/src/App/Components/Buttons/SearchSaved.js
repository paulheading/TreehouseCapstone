import React from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SearchIcon } from "../Icons";
import {
  albumResults,
  filmResult,
  resultSaved,
  firstTime,
  searchQuery,
  loadingResult,
} from "../../../actions";
import { getOMDBData, getSpotifyData } from "../../modules/search";

function SearchSavedButton({
  filmResult,
  albumResults,
  savedTitle,
  resultSaved,
  firstTime,
  searchQuery,
  loadingResult,
}) {
  const history = useHistory();
  const state = {
    firstTime: useSelector((state) => state.firstTime),
    blacklist: useSelector((state) => state.blacklist),
  };

  async function doSearch() {
    history.push("/");
    searchQuery(savedTitle);
    loadingResult(true);
    resultSaved(true);
    firstTime(false);

    albumResults(await getSpotifyData(savedTitle, state.blacklist));
    filmResult(await getOMDBData(savedTitle));
    loadingResult(false);
  }

  return (
    <Button variant="inline" onClick={doSearch}>
      <SearchIcon variant="secondary" size="sm" />
    </Button>
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
  loadingResult,
})(SearchSavedButton);
