import React from "react";
import {
  AboutButton,
  ExitButton,
  ExitArea,
  LoginMobileButton,
  SignupMobileButton,
} from "../../Buttons";
import "./Menu.scss";

export default function MenuOverlay({ setSavedFilms, setBlackLists }) {
  return (
    <div className="overlay__container menu">
      <ExitButton />
      <div className="overlay__wrap">
        <AboutButton />
        <LoginMobileButton />
        <SignupMobileButton
          setSavedFilms={setSavedFilms}
          setBlackLists={setBlackLists}
        />
      </div>
      <ExitArea />
    </div>
  );
}
