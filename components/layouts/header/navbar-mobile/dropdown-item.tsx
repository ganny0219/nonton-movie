import ChevronRightIcon from "@/assets/icons/chevron-right-icon";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  path: string;
};

function DropdownItem({ title, path }: Props) {
  return (
    <a
      href={path}
      className="flex flex-row items-center w-full md:w-[200px] p-2 hover:text-secondary"
    >
      <div>
        <ChevronRightIcon />
      </div>
      <span className="break-all ml-2">{title}</span>
    </a>
  );
}

export default DropdownItem;
