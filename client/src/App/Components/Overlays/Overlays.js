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
  isAboutOpen,
  isAccountOpen,
  isLoginOpen,
  isSignupOpen,
  savedFilms,
  blackLists,
  doSearch,
  searchTerm,
  isFirstTime,
  setCurrentUser,
  setIsAboutOpen,
  setIsAccountOpen,
  setIsLoginOpen,
  setIsSignupOpen,
  setSavedFilms,
  setBlackLists,
  setIsFirstTime,
  setResultSaved,
  setUpdateSearch,
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
          currentUser={currentUser}
          savedFilms={savedFilms}
          blackLists={blackLists}
          doSearch={doSearch}
          setIsAccountOpen={setIsAccountOpen}
          setCurrentUser={setCurrentUser}
          setSavedFilms={setSavedFilms}
          setBlackLists={setBlackLists}
          setIsFirstTime={setIsFirstTime}
          setResultSaved={setResultSaved}
        />
      );
    }
  }
  function loginState() {
    if (isLoginOpen) {
      return (
        <Login
          searchTerm={searchTerm}
          doSearch={doSearch}
          setResultSaved={setResultSaved}
          setIsLoginOpen={setIsLoginOpen}
          setIsSignupOpen={setIsSignupOpen}
          setCurrentUser={setCurrentUser}
          setBlackLists={setBlackLists}
          setSavedFilms={setSavedFilms}
          setUpdateSearch={setUpdateSearch}
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
