import React from "react";
import { useSelector } from "react-redux";
import { RemoveSavedButton, SearchSavedButton } from "../../../Buttons";
import { limitString } from "../../../../modules/helpers";

export default function AccountTable() {
  const state = {
    savedFilms: useSelector((state) => state.savedFilms),
  };

  function printSavedFilms() {
    return state.savedFilms.map(({ id, searchTerm }, index) => {
      return (
        <div className="account-table__row" key={index}>
          <span className="account-table__title">
            {limitString(searchTerm, 12)}
          </span>
          <SearchSavedButton savedTitle={searchTerm} />
          <RemoveSavedButton id={id} searchTerm={searchTerm} />
        </div>
      );
    });
  }

  return <div className="account-table__wrap">{printSavedFilms()}</div>;
}
