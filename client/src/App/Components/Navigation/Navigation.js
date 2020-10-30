import React from "react";
import { Navbar } from "react-bootstrap";
import { InlineLogo, MobileLogo } from "../Logos/Index";
import {
  AboutButton,
  BurgerButton,
  SignupDesktopButton,
  SignupMobileButton,
  LoginDesktopButton,
} from "../Buttons/Index";
import PropTypes from "prop-types";
import "./Navigation.scss";

export default function Navigation({
  currentUser,
  setCurrentUser,
  setSavedFilms,
  setBlackLists,
  setIsFirstTime,
}) {
  return (
    <Navbar className="movie-tunes" expand="md">
      <Navbar.Brand href="/">
        <InlineLogo className="md-up" />
        <MobileLogo className="md-down" />
      </Navbar.Brand>
      <div className="mobile-buttons md-down">
        <SignupMobileButton
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setSavedFilms={setSavedFilms}
          setBlackLists={setBlackLists}
          setIsFirstTime={setIsFirstTime}
        />
        <BurgerButton />
      </div>
      <div className="desktop-buttons md-up">
        <AboutButton />
        <LoginDesktopButton currentUser={currentUser} />
        <SignupDesktopButton currentUser={currentUser} />
      </div>
    </Navbar>
  );
}

Navigation.propTypes = {
  currentUser: PropTypes.object,
};
