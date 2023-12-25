import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  selected: string;
  path: string;
  name: string;
  title: string;
};

function DrawerPanelItem({ title, selected, path, name }: Props) {
  return (
    <div
      className={`flex justify-center items-center w-[100%] aspect-video my-2 ${
        selected === name ? "border-r-2 border-solid border-[#000]" : ""
      }`}
    >
      <Link href={{ pathname: path }}>
        <h2 className="font-bold text-center">{title}</h2>
      </Link>
    </div>
  );
}

export default DrawerPanelItem;
