import React from "react";
import { Link } from "react-router-dom";
import { BurgerIcon } from "../Icons";

export default function BurgerButton() {
  return (
    <div className="btn btn-inline">
      <Link to="/menu">
        <BurgerIcon />
      </Link>
    </div>
  );
}
