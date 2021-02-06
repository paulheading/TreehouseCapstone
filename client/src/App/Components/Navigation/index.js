import React from "react";
import { Navbar } from "react-bootstrap";
import { InlineLogo, MobileLogo } from "../Logos";
import {
  AboutButton,
  BurgerButton,
  SignupDesktopButton,
  SignupMobileButton,
  LoginDesktopButton,
} from "../Buttons";

export default function Navigation() {
  return (
    <Navbar className="movie-tunes" expand="md">
      <Navbar.Brand>
        <InlineLogo className="md-up" />
        <MobileLogo className="md-down" />
      </Navbar.Brand>
      <div className="mobile-buttons md-down">
        <SignupMobileButton />
        <BurgerButton />
      </div>
      <div className="desktop-buttons md-up">
        <AboutButton />
        <LoginDesktopButton />
        <SignupDesktopButton />
      </div>
    </Navbar>
  );
}
