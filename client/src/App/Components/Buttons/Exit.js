import React from "react";
import { RemoveIcon } from "../Icons/Icons";
import { changeNavbar } from "../../modules/animations";

export default function Exit({ className }) {
  return (
    <div
      className={className}
      onClick={() => {
        changeNavbar("close");
      }}
    >
      <RemoveIcon variant="secondary" />
    </div>
  );
}
