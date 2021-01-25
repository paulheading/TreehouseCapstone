import React from "react";
import { applyVariant } from "../../modules/helpers";

export default function SearchIcon({ variant, size }) {
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
