import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  path?: string;
};

function MenuDropdown({ children, onMouseOver, onMouseLeave, path }: Props) {
  return (
    <Link
      href={path ? { pathname: path } : {}}
      className=" flex flex-row justify-center items-center p-2 px-4 hover:cursor-pointer hover:text-secondary"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}

export default MenuDropdown;
