import React from "react";
import "./Account.scss";
import { Button, Tabs, Tab } from "react-bootstrap";
import { filterDate } from "../../../modules/helpers";
import { RemoveIcon, AvatarIcon } from "../../SvgIcon/SvgIcon";
import PropTypes from "prop-types";
import SavedFilms from "./SavedFilms";

export default function Account({
  setIsAccountOpen,
  currentUser,
  setCurrentUser,
  blackLists,
  setBlackLists,
  doSearch,
  savedFilms,
  setSavedFilms,
  setIsFirstTime,
}) {
  if (currentUser) {
    function sinceDate(date) {
      if (date) {
        return (
          <div className="profile-tab__since">
            Member since
            <br />
            {filterDate(currentUser.createdAt)}
          </div>
        );
      }
    }
    return (
      <div className="account-overlay__container">
        <div
          className="login-overlay__exit-icon"
          onClick={() => {
            setIsAccountOpen(false);
          }}
        >
          <RemoveIcon variant="secondary" />
        </div>
        <div className="account-overlay__wrap">
          <Tabs defaultActiveKey="profile" transition={false}>
            <Tab eventKey="profile" title="Profile" className="profile">
              <div className="profile-tab__avatar">
                <AvatarIcon />
              </div>
              <div className="profile-tab__name">
                {currentUser.firstName}&nbsp;
                {currentUser.lastName}
              </div>
              {sinceDate(currentUser.createdAt)}
              <div className="profile-tab__log-out">
                <Button
                  variant="outline-primary"
                  size="md"
                  onClick={() => {
                    setCurrentUser(null);
                    setSavedFilms(null);
                    setBlackLists(null);
                    setIsFirstTime(false);
                    setIsAccountOpen(false);
                  }}
                >
                  Log Out
                </Button>
              </div>
            </Tab>
            <Tab eventKey="saved" title="Saved">
              <SavedFilms
                savedFilms={savedFilms}
                blackLists={blackLists}
                doSearch={doSearch}
                setIsAccountOpen={setIsAccountOpen}
                setBlackLists={setBlackLists}
                setSavedFilms={setSavedFilms}
              />
            </Tab>
          </Tabs>
        </div>
        <div
          className="account-overlay__exit"
          onClick={() => {
            setIsAccountOpen(false);
          }}
        ></div>
      </div>
    );
  }
}

Account.propTypes = {
  currentUser: PropTypes.object,
  blackLists: PropTypes.array,
  savedFilms: PropTypes.array,
};
