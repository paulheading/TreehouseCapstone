import React, { useRef } from "react";
import { applyClass, applyVariant } from "../../modules/helpers";
import { moveDown, moveUp } from "../../modules/animations.js";
import "./SvgIcon.scss";

export function HeartIcon({ saved }) {
  return (
    <svg
      version="1.1"
      className={`icon-heart ${applyClass(saved, "saved")}`}
      width="36"
      height="32.4"
      viewBox="0 0 36 32.4"
    >
      <path
        className="fill"
        d="M36,9.7c0,6.7-6.1,12.1-15.4,20.4L18,32.4l-2.6-2.3C6.1,21.9,0,16.4,0,9.7	C0,4.3,4.4,0,9.9,0C13,0,16,1.4,18,3.7C20,1.4,23,0,26.1,0C31.6,0,36,4.3,36,9.7z"
        fill="#FCFCFC"
      />
      <path
        className="outline"
        d="M18.2,27.5L18,27.7l-0.2-0.2C9.3,19.9,3.6,14.8,3.6,9.7c0-3.5,2.7-6.2,6.3-6.2	c2.8,0,5.5,1.8,6.4,4.2h3.4c0.9-2.4,3.6-4.2,6.4-4.2c3.6,0,6.3,2.7,6.3,6.2C32.4,14.8,26.7,19.9,18.2,27.5z M26.1,0	C23,0,20,1.4,18,3.7C16,1.4,13,0,9.9,0C4.4,0,0,4.3,0,9.7c0,6.7,6.1,12.1,15.4,20.4l2.6,2.3l2.6-2.3C29.9,21.9,36,16.4,36,9.7	C36,4.3,31.6,0,26.1,0z"
        fill="#404040"
      />
    </svg>
  );
}

export function RemoveIcon({ variant, size }) {
  return (
    <svg
      version="1.1"
      className={`icon-remove ${applyVariant(variant, "icon")} ${applyVariant(
        size,
        "size"
      )}`}
      viewBox="0 0 36 36"
    >
      <path
        className="fill"
        d="M35.1,18c0,9.5-7.6,17.1-17.1,17.1S0.9,27.5,0.9,18S8.5,0.9,18,0.9S35.1,8.5,35.1,18z"
        fill="#FCFCFC"
      />
      <path
        className="outline"
        d="M18,32.4c-7.9,0-14.4-6.5-14.4-14.4S10.1,3.6,18,3.6S32.4,10.1,32.4,18	S25.9,32.4,18,32.4z M18,0C8,0,0,8,0,18s8,18,18,18s18-8,18-18S28,0,18,0z M22.7,10.8L18,15.5l-4.7-4.7l-2.5,2.5l4.7,4.7l-4.7,4.7	l2.5,2.5l4.7-4.7l4.7,4.7l2.5-2.5L20.5,18l4.7-4.7L22.7,10.8z"
        fill="#404040"
      />
    </svg>
  );
}

export function XLinkIcon() {
  return (
    <svg
      version="1.1"
      className="icon-x-link"
      width="19.8"
      height="19.8"
      viewBox="0 0 19.8 19.8"
    >
      <path
        className="outline"
        d="M17.6,0H2.2C1,0,0,1,0,2.2v4.4h2.2V2.2h15.4v15.4H2.2v-4.4H0v4.4c0,1.2,1,2.2,2.2,2.2	h15.4c1.2,0,2.2-1,2.2-2.2V2.2C19.8,1,18.8,0,17.6,0z M7.8,13.8l1.6,1.6l5.5-5.5L9.4,4.4L7.8,6l2.8,2.8H0V11h10.6L7.8,13.8z"
        fill="#404040"
      />
    </svg>
  );
}

export function NextIcon({ limit, nextClicks, setNextClicks }) {
  let nextSvg = useRef(null);
  return (
    <svg
      ref={nextSvg}
      onClick={() => {
        nextClicks = nextClicks + 1;
        moveDown(nextSvg.current, nextClicks, limit);
        setNextClicks(nextClicks);
      }}
      version="1.1"
      className="icon-next"
      width="42.6"
      height="42.6"
      viewBox="0 0 42.6 42.6"
    >
      <path
        className="fill"
        d="M21.3,42.6C9.6,42.6,0,33,0,21.3C0,9.6,9.6,0,21.3,0C33,0,42.6,9.6,42.6,21.3	C42.6,33,33,42.6,21.3,42.6z"
      />
      <path
        className="outline"
        d="M21.3,42.6C9.6,42.6,0,33,0,21.3C0,9.6,9.6,0,21.3,0C33,0,42.6,9.6,42.6,21.3	C42.6,33,33,42.6,21.3,42.6z M21.3,3C11.2,3,3,11.2,3,21.3c0,10.1,8.2,18.3,18.3,18.3c10.1,0,18.3-8.2,18.3-18.3	C39.6,11.2,31.4,3,21.3,3z"
      />
      <path
        className="arrow"
        d="M30.1,17.9l-8.8,8.8l-8.8-8.8l2.1-2.1l6.7,6.7l6.7-6.7L30.1,17.9z"
      />
    </svg>
  );
}

export function PrevIcon({ limit, nextClicks, setNextClicks }) {
  let prevSvg = useRef(null);
  return (
    <svg
      ref={prevSvg}
      onClick={() => {
        nextClicks = nextClicks - 1;
        moveUp(prevSvg.current, nextClicks, limit);
        setNextClicks(nextClicks);
      }}
      version="1.1"
      className="icon-prev"
      width="42.6"
      height="42.6"
      viewBox="0 0 42.6 42.6"
    >
      <path
        className="fill"
        d="M21.3,0C33,0,42.6,9.6,42.6,21.3S33,42.6,21.3,42.6S0,33,0,21.3S9.6,0,21.3,0z"
      />
      <path
        className="outline"
        d="M21.3,0C33,0,42.6,9.6,42.6,21.3S33,42.6,21.3,42.6S0,33,0,21.3S9.6,0,21.3,0z M21.3,39.6c10.1,0,18.3-8.2,18.3-18.3S31.4,3,21.3,3S3,11.2,3,21.3S11.2,39.6,21.3,39.6z"
      />
      <path
        className="arrow"
        d="M12.5,24.7l8.8-8.8l8.8,8.8L28,26.8l-6.7-6.7l-6.7,6.7L12.5,24.7z"
      />
    </svg>
  );
}

export function AvatarIcon() {
  return (
    <svg
      version="1.1"
      className="icon-avatar"
      width="75"
      height="75"
      viewBox="0 0 75 75"
    >
      <path
        className="face"
        d="M37.5,67.5c-16.5,0-30-13.5-30-30c0-1.1,0.1-2.2,0.2-3.2c8.9-3.9,15.9-11.2,19.5-20.1C34,23.7,45.2,30,57.8,30	c2.9,0,5.7-0.3,8.4-1c0.8,2.7,1.2,5.5,1.2,8.5C67.5,54,54,67.5,37.5,67.5z M37.5,0C16.8,0,0,16.8,0,37.5S16.8,75,37.5,75	S75,58.2,75,37.5S58.2,0,37.5,0z M48.8,36.6c-2.6,0-4.7,2.1-4.7,4.7s2.1,4.7,4.7,4.7s4.7-2.1,4.7-4.7S51.3,36.6,48.8,36.6z M26.2,36.6c-2.6,0-4.7,2.1-4.7,4.7s2.1,4.7,4.7,4.7s4.7-2.1,4.7-4.7S28.8,36.6,26.2,36.6z"
      />
    </svg>
  );
}

export function SearchIcon({ variant, size }) {
  return (
    <svg
      version="1.1"
      className={`icon-search ${applyVariant(variant, "icon")} ${applyVariant(
        size,
        "size"
      )}`}
      width="25"
      height="25"
      viewBox="0 0 25 25"
    >
      <path
        className="magnify"
        d="M10.1,17.1c-3.9,0-7-3.1-7-7c0-3.9,3.1-7,7-7c3.9,0,7,3.1,7,7C17.1,14,14,17.1,10.1,17.1z M18.3,16c1.2-1.7,1.9-3.7,1.9-5.9	C20.2,4.5,15.7,0,10.1,0S0,4.5,0,10.1s4.5,10.1,10.1,10.1c2.2,0,4.2-0.7,5.9-1.9c3,3,5.2,5.2,6.7,6.7l2.3-2.3	C23.5,21.2,21.3,19,18.3,16z"
      />
    </svg>
  );
}

export function BurgerIcon() {
  return (
    <svg
      version="1.1"
      className="icon-burger"
      width="30"
      height="20"
      viewBox="0 0 30 20"
    >
      <path d="M0,0v3.3h30V0H0z M0,11.7h30V8.3H0V11.7z M0,20h30v-3.3H0V20z" />
    </svg>
  );
}

export function HelpIcon() {
  return (
    <svg
      version="1.1"
      className="icon-help"
      width="40.5"
      height="40.5"
      viewBox="0 0 40.5 40.5"
    >
      <path d="M20.2,8.1c-4.5,0-8.1,3.6-8.1,8.1h4.1c0-2.2,1.8-4.1,4-4.1s4,1.8,4,4.1c0,4-6.1,3.5-6.1,10.1h4c0-4.6,6.1-5.1,6.1-10.1	C28.3,11.7,24.7,8.1,20.2,8.1z M20.2,36.5c-8.9,0-16.2-7.3-16.2-16.2S11.3,4,20.2,4s16.2,7.3,16.2,16.2S29.2,36.5,20.2,36.5z M20.2,0C9.1,0,0,9.1,0,20.2s9.1,20.2,20.2,20.2s20.2-9.1,20.2-20.2S31.4,0,20.2,0z M18.2,32.4h4v-4.1h-4V32.4z" />
    </svg>
  );
}
