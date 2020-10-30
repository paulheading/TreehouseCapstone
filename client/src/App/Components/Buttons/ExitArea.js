import React from "react";
import { Link } from "react-router-dom";

export default function ExitArea() {
  return (
    <Link to="/">
      <div className="overlay__exit"></div>
    </Link>
  );
}
