import React from "react";
import { applyClass } from "../../modules/helpers";

export default function SaveIcon({ resultSaved }) {
  return (
    <svg
      version="1.1"
      className={`icon-save ${applyClass(resultSaved, "saved")}`}
      width="36"
      height="32.4"
      viewBox="0 0 36 32.4"
    >
      <path
        className="fill"
        d="M36,9.7c0,6.7-6.1,12.1-15.4,20.4L18,32.4l-2.6-2.3C6.1,21.9,0,16.4,0,9.7	C0,4.3,4.4,0,9.9,0C13,0,16,1.4,18,3.7C20,1.4,23,0,26.1,0C31.6,0,36,4.3,36,9.7z"
      />
      <path
        className="outline"
        d="M18.2,27.5L18,27.7l-0.2-0.2C9.3,19.9,3.6,14.8,3.6,9.7c0-3.5,2.7-6.2,6.3-6.2	c2.8,0,5.5,1.8,6.4,4.2h3.4c0.9-2.4,3.6-4.2,6.4-4.2c3.6,0,6.3,2.7,6.3,6.2C32.4,14.8,26.7,19.9,18.2,27.5z M26.1,0	C23,0,20,1.4,18,3.7C16,1.4,13,0,9.9,0C4.4,0,0,4.3,0,9.7c0,6.7,6.1,12.1,15.4,20.4l2.6,2.3l2.6-2.3C29.9,21.9,36,16.4,36,9.7	C36,4.3,31.6,0,26.1,0z"
      />
    </svg>
  );
}
