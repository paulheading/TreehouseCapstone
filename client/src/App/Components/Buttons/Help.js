import React from "react";
import { Link } from "react-router-dom";
import { HelpIcon } from "../Icons";

export default function HelpButton() {
  return (
    <div className="btn btn-inline">
      <Link to="/about">
        <HelpIcon />
      </Link>
    </div>
  );
}
