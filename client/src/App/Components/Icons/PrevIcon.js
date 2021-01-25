import React, { useRef } from "react";
import { moveUp } from "../../modules/animations.js";

export default function PrevIcon({ limit, nextClicks, setNextClicks }) {
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
