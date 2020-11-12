import React from "react";
import { connect, useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import { filterDate } from "../../../modules/helpers";
import { ExitButton, ExitArea, LogoutAccountButton } from "../../Buttons";
import { AvatarIcon } from "../../Icons/Icons";
import SavedFilms from "./SavedFilms";
import "./Account.scss";

function AccountOverlay({ doSearch, customSearch }) {
  const store = {
    currentUser: useSelector((state) => state.currentUser),
  };
  if (store.currentUser) {
    function sinceDate(date) {
      if (date) {
        return (
          <div className="profile-tab__since">
            Member since
            <br />
            {filterDate(store.currentUser.createdAt)}
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
                {store.currentUser.firstName}&nbsp;
                {store.currentUser.lastName}
              </div>
              {sinceDate(store.currentUser.createdAt)}
              <div className="profile-tab__log-out">
                <LogoutAccountButton customSearch={customSearch} />
              </div>
            </Tab>
            <Tab eventKey="saved" title="Saved">
              <SavedFilms doSearch={doSearch} customSearch={customSearch} />
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
