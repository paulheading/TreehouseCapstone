import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SearchIcon } from "../Icons/Icons";
import { resultSaved, searchQuery } from "../../../actions";

function SearchSavedButton({ savedTitle, doSearch, resultSaved, searchQuery }) {
  return (
    <Link to="/" className="search-saved__link">
      <Button
        variant="inline"
        onClick={() => {
          searchQuery(savedTitle);
          doSearch(savedTitle);
          resultSaved(true);
        }}
      >
        <SearchIcon variant="secondary" size="sm" />
      </Button>
    </Link>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { resultSaved, searchQuery })(
  SearchSavedButton
);
