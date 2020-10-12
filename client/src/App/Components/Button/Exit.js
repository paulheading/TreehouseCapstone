import React from "react";
import { RemoveIcon } from "../SvgIcon/SvgIcon";
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
