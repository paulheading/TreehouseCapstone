import React from "react";
import { connect, useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import { filterDate } from "../../../modules/helpers";
import { ExitButton, ExitArea, LogoutAccountButton } from "../../Buttons";
import { AvatarIcon } from "../../Icons";
import SavedFilms from "./Saved/Films";

function AccountOverlay() {
  const state = {
    currentUser: useSelector((state) => state.currentUser),
  };
  if (state.currentUser) {
    function sinceDate(date) {
      if (date) {
        return (
          <div className="profile-tab__since">
            Member since
            <br />
            {filterDate(state.currentUser.createdAt)}
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
                {state.currentUser.firstName}&nbsp;
                {state.currentUser.lastName}
              </div>
              {sinceDate(state.currentUser.createdAt)}
              <div className="profile-tab__log-out">
                <LogoutAccountButton />
              </div>
            </Tab>
            <Tab eventKey="saved" title="Saved">
              <SavedFilms />
            </Tab>
          </Tabs>
        </div>
        <ExitArea />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(AccountOverlay);
