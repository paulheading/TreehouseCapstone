import React from "react";
import { Table, Button, ListGroup } from "react-bootstrap";
import { delRoute, limitString } from "../../../modules/helpers";
import PropTypes from "prop-types";
import { RemoveIcon, SearchIcon } from "../../SvgIcon/SvgIcon";
export default function SavedFilms({
  savedFilms,
  blackLists,
  doSearch,
  setIsAccountOpen,
  setBlackLists,
  setSavedFilms,
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
                  }}
                >
                  <SearchIcon variant="secondary" size="sm" />
                </Button>
                <Button
                  variant="inline"
                  onClick={() => {
                    delRoute("saved", id);
                    if (blackLists) {
                      blackLists.forEach((value) => {
                        if (value.searchTerm === searchTerm) {
                          delRoute("blacklist", value.albumId);
                        }
                      });
                      setBlackLists(
                        blackLists.filter((value) => {
                          return value.searchTerm !== searchTerm;
                        })
                      );
                    }
                    setSavedFilms(
                      savedFilms.filter((value) => {
                        return value.id !== id;
                      })
                    );
                  }}
                >
                  <RemoveIcon variant="secondary" size="sm" />
                </Button>
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
