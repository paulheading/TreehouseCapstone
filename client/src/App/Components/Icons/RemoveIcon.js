import React from "react";
import { applyVariant } from "../../modules/helpers";

export default function RemoveIcon({ variant, size }) {
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
