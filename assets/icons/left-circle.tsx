import { IconProps } from "@/types/global";
import React from "react";

function LeftCircle({ size, color }: IconProps) {
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
        d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default LeftCircle;
