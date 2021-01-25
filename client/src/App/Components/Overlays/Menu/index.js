import React from "react";
import {
  AboutButton,
  ExitButton,
  ExitArea,
  LoginMobileButton,
  SignupMobileButton,
} from "../../Buttons";

export default function MenuOverlay() {
  return (
    <div className="overlay__container menu">
      <ExitButton />
      <div className="overlay__wrap">
        <AboutButton />
        <LoginMobileButton />
        <SignupMobileButton />
      </div>
      <ExitArea />
    </div>
  );
}
