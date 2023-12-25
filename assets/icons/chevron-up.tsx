import { IconProps } from "@/types/global";
import React from "react";

function ChevronUpIcon({ size, color }: IconProps) {
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
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}

export default ChevronUpIcon;
