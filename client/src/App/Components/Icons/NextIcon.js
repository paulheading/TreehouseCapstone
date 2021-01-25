import React, { useRef } from "react";
import { moveDown } from "../../modules/animations.js";

export default function NextIcon({ limit, nextClicks, setNextClicks }) {
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
