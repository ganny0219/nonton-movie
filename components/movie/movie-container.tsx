import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  seeAll?: boolean;
  seeAllPath?: string;
};

function MovieContainer({ seeAllPath, seeAll, title, children }: Props) {
  return (
    <div className="flex flex-col border-b-[1px] border-[#363636] border-solid py-4">
      <div className="flex flex-row items-center text-white py-4 text-2xl">
        <div className="w-[3px] h-[1em] truncate bg-secondary mr-2 md:mr-4" />
        <h3 className="flex-1 truncate md:text-2xl">{title}</h3>
        {seeAll && (
          <Link
            href={{
              pathname: seeAllPath,
            }}
            className="bg-secondary px-2 py-1 text-[0.5rem] font-bold rounded text-[#313131] text-xs"
          >
            SEE ALL
          </Link>
        )}
      </div>
      <div
        className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 grid-rows-1 gap-4 w-full`}
      >
        {children}
      </div>
    </div>
  );
}

export default MovieContainer;
