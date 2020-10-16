import React from "react";
import { BurgerIcon } from "../Icons/Icons";
import { changeNavbar } from "../../modules/animations";

export default function Burger() {
  return (
    <div
      className="btn btn-inline"
      onClick={() => {
        changeNavbar("open");
      }}
    >
      <BurgerIcon />
    </div>
  );
}
