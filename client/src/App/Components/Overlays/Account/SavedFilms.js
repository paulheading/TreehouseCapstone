import React from "react";
import { Table, Button, ListGroup } from "react-bootstrap";
import { limitString } from "../../../modules/helpers";
import { SearchIcon } from "../../Icons/Icons";
import { RemoveSavedButton } from "../../Buttons/Buttons";
import PropTypes from "prop-types";

export default function SavedFilms({
  savedFilms,
  blackLists,
  doSearch,
  setIsAccountOpen,
  setBlackLists,
  setSavedFilms,
  setResultSaved,
}) {
  return savedFilms.length > 0 ? (
    <Table striped className="saved-table">
      <tbody>
        {savedFilms.map(({ id, searchTerm }, index) => {
          return (
            <tr key={index}>
              <td>
                <div className="saved-table__term">
                  {limitString(searchTerm, 12)}
                </div>
              </td>
              <td width="78">
                <Button
                  variant="inline"
                  onClick={() => {
                    doSearch(searchTerm);
                    setIsAccountOpen(false);
                    setResultSaved(true);
                  }}
                >
                  <SearchIcon variant="secondary" size="sm" />
                </Button>
                <RemoveSavedButton
                  id={id}
                  savedFilms={savedFilms}
                  blackLists={blackLists}
                  searchTerm={searchTerm}
                  setResultSaved={setResultSaved}
                  setBlackLists={setBlackLists}
                  setSavedFilms={setSavedFilms}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <ListGroup variant="secondary">
      <ListGroup.Item>
        Use <strong>MovieTunes</strong> to save your favourite soundtracks. It’s
        free to use, so have fun!
      </ListGroup.Item>
    </ListGroup>
  );
}

SavedFilms.propTypes = {
  savedFilms: PropTypes.array,
  blackLists: PropTypes.array,
};
