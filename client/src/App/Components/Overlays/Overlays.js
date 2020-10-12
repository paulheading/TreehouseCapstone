import React from "react";
import { Container, Badge } from "react-bootstrap";
import About from "./About/About";
import Account from "./Account/Account";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import PropTypes from "prop-types";
import "./Overlays.scss";

export default function Overlays({
  currentUser,
  setCurrentUser,
  isAboutOpen,
  setIsAboutOpen,
  isAccountOpen,
  setIsAccountOpen,
  isLoginOpen,
  setIsLoginOpen,
  isSignupOpen,
  setIsSignupOpen,
  savedFilms,
  setSavedFilms,
  blackLists,
  setBlackLists,
  doSearch,
  isFirstTime,
  setIsFirstTime,
}) {
  function aboutState() {
    if (isAboutOpen) {
      return <About setIsAboutOpen={setIsAboutOpen} />;
    }
  }
  function accountState() {
    if (isAccountOpen) {
      return (
        <Account
          setIsAccountOpen={setIsAccountOpen}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          savedFilms={savedFilms}
          setSavedFilms={setSavedFilms}
          blackLists={blackLists}
          setBlackLists={setBlackLists}
          doSearch={doSearch}
          setIsFirstTime={setIsFirstTime}
        />
      );
    }
  }
  function loginState() {
    if (isLoginOpen) {
      return (
        <Login
          setIsLoginOpen={setIsLoginOpen}
          setIsSignupOpen={setIsSignupOpen}
          setCurrentUser={setCurrentUser}
          setBlackLists={setBlackLists}
          setSavedFilms={setSavedFilms}
        />
      );
    }
  }
  function signupState() {
    if (isSignupOpen) {
      return (
        <Signup
          setIsSignupOpen={setIsSignupOpen}
          setCurrentUser={setCurrentUser}
          setIsFirstTime={setIsFirstTime}
          setIsLoginOpen={setIsLoginOpen}
        />
      );
    }
  }
  function isFirstTimeState() {
    if (isFirstTime) {
      return (
        <Container className="first-time">
          <Badge className="first-time" pill variant="primary">
            Welcome!
          </Badge>
        </Container>
      );
    }
  }
  return (
    <div className="overlay-component">
      {aboutState()}
      {accountState()}
      {loginState()}
      {signupState()}
      {isFirstTimeState()}
    </div>
  );
}

Overlays.propTypes = {
  currentUser: PropTypes.object,
  isAboutOpen: PropTypes.bool,
  isAccountOpen: PropTypes.bool,
  isLoginOpen: PropTypes.bool,
  isSignupOpen: PropTypes.bool,
  savedFilms: PropTypes.array,
  blackLists: PropTypes.array,
  isFirstTime: PropTypes.bool,
};
