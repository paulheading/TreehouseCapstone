import React from "react";
import {
  AboutButton,
  ExitButton,
  ExitArea,
  LoginMobileButton,
  SignupMobileButton,
} from "../../Buttons/Index";
import "./Menu.scss";

export default function MenuOverlay({
  currentUser,
  setCurrentUser,
  setSavedFilms,
  setBlackLists,
  setIsFirstTime,
}) {
  return (
    <div className="overlay__container menu">
      <ExitButton />
      <div className="overlay__wrap">
        <AboutButton />
        <LoginMobileButton currentUser={currentUser} />
        <SignupMobileButton
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setSavedFilms={setSavedFilms}
          setBlackLists={setBlackLists}
          setIsFirstTime={setIsFirstTime}
        />
      </div>
      <ExitArea />
    </div>
  );
}
