import Link from "next/link";
import React, { useRef, useState } from "react";
import MenuDropdown from "../menu-dropdown";
import CamIcon from "@/assets/icons/cam-icon";
import ChevronDownIcon from "@/assets/icons/chevron-down-icon";
import DropdownItemContainer from "./dropdown-item-container";
import DropdownItem from "./dropdown-item";
import TvIcon from "@/assets/icons/tv-icon";
import OpenFolderIcon from "@/assets/icons/open-folder-icon";
import SearchIcon from "@/assets/icons/search-icon";
import FilmIcon from "@/assets/icons/film-icon";
import { Movie } from "@/types/movie";
import DropdownSearchContainer from "../dropdown-search-container";
import DropdownSearchItem from "../dropdown-search-item";

type Props = {
  burgerToggle: boolean;
  searchToggle: boolean;
  searchMovie: Movie[];
  searchInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
function NavbarMobile({
  searchMovie,
  burgerToggle,
  searchToggle,
  searchInputHandler,
}: Props) {
  const [searchFocus, setSearchFocus] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchFocusIn = () => {
    setSearchFocus(true);
  };

  const searchFocusOut = () => {
    setTimeout(() => {
      setSearchFocus(false);
    }, 1000);
  };
  return (
    <>
      {searchToggle && (
        <div className="flex xl:hidden flex-row justify-center items-center bg-[#2E2E2C] rounded py-2 px-4 ">
          <input
            ref={searchInputRef}
            onFocus={searchFocusIn}
            onBlur={searchFocusOut}
            onChange={searchInputHandler}
            className="flex bg-[#2E2E2C] outline-none text-gray-200 w-full text-xl py-2"
            placeholder="search..."
          />
          <Link
            href={{
              pathname: `/search/${
                searchInputRef.current?.value
                  ? searchInputRef.current?.value
                  : ""
              }`,
            }}
          >
            <SearchIcon color="#ccc" size="1.5" />
          </Link>
        </div>
      )}
      {searchFocus && (
        <DropdownSearchContainer
          mobile
          searchInput={searchInputRef.current?.value}
          searchMovie={searchMovie}
        />
      )}
      {burgerToggle && (
        <div className="text-[#fff]">
          <Link
            href={{
              pathname: `/movie`,
            }}
            className="flex flex-col"
          >
            <div className="flex flex-row justify-start items-center pl-2">
              <CamIcon size="1.8" />
              <p className="m-2 text-xl">Movie</p>
            </div>
          </Link>
          {/* <div className="grid grid-cols-2">
            <DropdownItem title="Marvel" path={`/official/Marvel`} />
            <DropdownItem title="DC" path={`/official/DC Entertainment`} />
            <DropdownItem title="Disney" path={`/official/Disney`} />
          </div> */}
          <Link href={{ pathname: `/series` }} className="flex  flex-col">
            <div className="flex flex-row justify-start items-center pl-2">
              <TvIcon size="1.5" />
              <p className="m-2 text-xl">TV Series</p>
            </div>
          </Link>
          {/* <div className="grid grid-cols-2">
            <DropdownItem title="Netflix Series" path={`/official/Netflix`} />
            <DropdownItem
              title="Amazon Prime"
              path={`/official/Amazon Prime`}
            />
            <DropdownItem title="Disney+ Series" path={`/official/Disney+`} />
            <DropdownItem title="HBO Series" path={`/official/HBO`} />
          </div> */}
          <Link
            href={{
              pathname: "/anime",
            }}
            className="flex flex-row justify-start items-center pl-2 my-2 hover:cursor-pointer hover:text-secondary"
          >
            <FilmIcon size="1.6" />
            <p className="ml-2 text-xl">Anime</p>
          </Link>
          <Link
            href={{
              pathname: "/drama-korea",
            }}
            className="flex flex-row justify-start items-center pl-2 mt-4 mb-2 hover:cursor-pointer hover:text-secondary"
          >
            <FilmIcon size="1.6" />
            <p className="ml-2 text-xl">Drakor</p>
          </Link>
          {/* <Link
            href={{
              pathname: "/genre",
            }}
            className="flex flex-row justify-start items-center pl-2 my-4 hover:cursor-pointer hover:text-secondary"
          >
            <OpenFolderIcon size="1.6" />
            <p className="ml-2 text-xl">Genre</p>
          </Link> */}
          <div className="flex flex-col">
            <div className="flex flex-row justify-start items-center pl-2">
              <OpenFolderIcon size="1.6" />
              <p className="m-2 text-xl">Other</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <DropdownItem title="Official" path={`/official`} />
            <DropdownItem title="Genre" path={`/genre`} />
            <DropdownItem title="Country" path={`/country`} />
            <DropdownItem title="Jadwal Rilis" path={`/jadwal-rilis`} />
          </div>
        </div>
      )}
    </>
  );
}

export default NavbarMobile;
