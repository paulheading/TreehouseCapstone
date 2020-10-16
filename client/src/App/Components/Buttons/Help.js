import React from "react";
import { HelpIcon } from "../Icons/Icons";

export default function Help({ setIsAboutOpen }) {
  return (
    <div
      className="btn btn-inline"
      onClick={() => {
        setIsAboutOpen(true);
      }}
    >
      <HelpIcon />
    </div>
  );
}
