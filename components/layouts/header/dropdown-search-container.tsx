import { Movie } from "@/types/movie";
import React, { ReactNode } from "react";
import DropdownSearchItem from "./dropdown-search-item";
import Link from "next/link";

type Props = {
  mobile?: boolean;
  searchMovie: Movie[];
  // searchFocusOut: () => void;
  searchInput: string | undefined;
};

function DropdownSearchContainer({ mobile, searchMovie, searchInput }: Props) {
  return (
    <div className={`relative ${mobile ? "" : "px-2"} `}>
      {/* <div className="absolute w-full md:w-[268px] h-4 z-10" /> */}
      <div className="absolute w-full xs:w-[50%] min-w-[268px] lg:w-full flex flex-col lg:right-0 lg:top-5 bg-[#000000] z-10">
        {searchMovie.map((movie, movieIndex) => {
          if (mobile) {
            if (movieIndex < 3) {
              return <DropdownSearchItem key={movieIndex} movie={movie} />;
            }
          } else {
            return <DropdownSearchItem key={movieIndex} movie={movie} />;
          }
        })}
        {searchMovie.length > 2 && (
          <Link
            href={{ pathname: `/search/${searchInput}` }}
            className="flex flex-row w-full max-w-[400px] lg:w-full p-2 hover:text-secondary"
          >
            <p className="truncate ml-2 py-2 text-2xl  lg:text-base text-center">
              Search more
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default DropdownSearchContainer;
