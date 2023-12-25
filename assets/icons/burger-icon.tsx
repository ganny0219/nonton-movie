import { IconProps } from "@/types/global";
import React from "react";

function BurgerIcon({ size, color }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color ? `${color}` : "currentColor"}
      width={size ? `${size}rem` : `1rem`}
      height={size ? `${size}rem` : `1rem`}
      // className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

export default BurgerIcon;
