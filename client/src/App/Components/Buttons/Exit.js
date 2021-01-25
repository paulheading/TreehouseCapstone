import React from "react";
import { Link } from "react-router-dom";
import { ifClassExists } from "../../modules/helpers";
import { RemoveIcon } from "../Icons";

export default function ExitButton({ className }) {
  return (
    <div className={`overlay__exit-icon ${ifClassExists(className)}`}>
      <Link to="/">
        <RemoveIcon variant="secondary" />
      </Link>
    </div>
  );
}
