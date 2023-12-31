import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  path?: string;
};

function SearchDropdown({ children, onMouseOver, onMouseLeave, path }: Props) {
  return (
    <div
      className="flex flex-row justify-center items-center p-2 hover:cursor-pointer hover:text-secondary"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

export default SearchDropdown;
