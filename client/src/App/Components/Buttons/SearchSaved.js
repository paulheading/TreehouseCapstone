import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SearchIcon } from "../Icons/Icons";

export default function SearchSavedButton({
  searchTerm,
  doSearch,
  setResultSaved,
}) {
  return (
    <Link to="/" className="search-saved__link">
      <Button
        variant="inline"
        onClick={() => {
          doSearch(searchTerm);
          setResultSaved(true);
        }}
      >
        <SearchIcon variant="secondary" size="sm" />
      </Button>
    </Link>
  );
}
