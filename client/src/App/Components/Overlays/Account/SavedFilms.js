import React from "react";
import { connect, useSelector } from "react-redux";
import { Table, ListGroup } from "react-bootstrap";
import { RemoveSavedButton, SearchSavedButton } from "../../Buttons";
import { limitString } from "../../../modules/helpers";

function SavedFilms({ doSearch }) {
  const store = {
    savedFilms: useSelector((state) => state.savedFilms),
  };
  return store.savedFilms.length > 0 ? (
    <Table striped className="saved-table">
      <tbody>
        {store.savedFilms.map(({ id, searchTerm }, index) => {
          return (
            <tr key={index}>
              <td>
                <div className="saved-table__term">
                  {limitString(searchTerm, 12)}
                </div>
              </td>
              <td width="78">
                <SearchSavedButton
                  savedTitle={searchTerm}
                  doSearch={doSearch}
                />
                <RemoveSavedButton
                  id={id}
                  searchTerm={searchTerm}
                  doSearch={doSearch}
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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SavedFilms);
