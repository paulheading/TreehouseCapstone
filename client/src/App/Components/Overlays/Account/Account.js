import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { filterDate } from "../../../modules/helpers";
import { ExitButton, ExitArea, LogoutAccountButton } from "../../Buttons/Index";
import { AvatarIcon } from "../../Icons/Icons";
import PropTypes from "prop-types";
import SavedFilms from "./SavedFilms";
import "./Account.scss";

export default function AccountOverlay({
  currentUser,
  savedFilms,
  blackLists,
  doSearch,
  setCurrentUser,
  setBlackLists,
  setSavedFilms,
  setIsFirstTime,
  setResultSaved,
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
      <div className="overlay__container account">
        <ExitButton />
        <div className="overlay__wrap">
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
                <LogoutAccountButton
                  setCurrentUser={setCurrentUser}
                  setSavedFilms={setSavedFilms}
                  setBlackLists={setBlackLists}
                  setIsFirstTime={setIsFirstTime}
                />
              </div>
            </Tab>
            <Tab eventKey="saved" title="Saved">
              <SavedFilms
                savedFilms={savedFilms}
                blackLists={blackLists}
                doSearch={doSearch}
                setBlackLists={setBlackLists}
                setSavedFilms={setSavedFilms}
                setResultSaved={setResultSaved}
              />
            </Tab>
          </Tabs>
        </div>
        <ExitArea />
      </div>
    );
  }
}

AccountOverlay.propTypes = {
  currentUser: PropTypes.object,
  blackLists: PropTypes.array,
  savedFilms: PropTypes.array,
};
