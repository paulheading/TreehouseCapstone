import React from "react";
import "./Navigation.scss";
import { Navbar, Button } from "react-bootstrap";
import { changeNavbar } from "../../modules/animations";
import { InlineLogo, MobileLogo } from "../Logos/Logos";
import PropTypes from "prop-types";
import {
  ExitButton,
  BurgerButton,
  SignupDesktopButton,
  SignupMobileButton,
  LoginDesktopButton,
  LoginMobileButton,
} from "../Buttons/Buttons";

export default function Navigation({
  currentUser,
  setCurrentUser,
  setIsLoginOpen,
  setIsAboutOpen,
  setIsAccountOpen,
  setIsSignupOpen,
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
      <div className="navbar-mobile-controls md-down">
        <SignupMobileButton
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setSavedFilms={setSavedFilms}
          setBlackLists={setBlackLists}
          setIsFirstTime={setIsFirstTime}
          setIsSignupOpen={setIsSignupOpen}
        />
        <BurgerButton />
      </div>
      <Navbar.Collapse className="justify-content-end">
        <ExitButton className="navbar-mobile__exit-icon md-down" />
        <div className="navbar-mobile-wrap">
          <Button
            variant="link"
            size="lg"
            onClick={() => {
              setIsAboutOpen(true);
              changeNavbar("close");
            }}
          >
            About
          </Button>
          <LoginMobileButton
            currentUser={currentUser}
            setIsLoginOpen={setIsLoginOpen}
            setIsAccountOpen={setIsAccountOpen}
          />
          <LoginDesktopButton
            currentUser={currentUser}
            setIsLoginOpen={setIsLoginOpen}
            setIsAccountOpen={setIsAccountOpen}
          />
          <SignupDesktopButton
            currentUser={currentUser}
            setIsSignupOpen={setIsSignupOpen}
          />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

Navigation.propTypes = {
  currentUser: PropTypes.object,
};
