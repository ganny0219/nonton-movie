import Link from "next/link";
import React, { use, useRef, useState } from "react";
import MenuDropdown from "../menu-dropdown";
import CamIcon from "@/assets/icons/cam-icon";
import ChevronDownIcon from "@/assets/icons/chevron-down-icon";
import DropdownItemContainer from "./dropdown-item-container";
import DropdownItem from "./dropdown-item";
import TvIcon from "@/assets/icons/tv-icon";
import OpenFolderIcon from "@/assets/icons/open-folder-icon";
import FilmIcon from "@/assets/icons/film-icon";
import SearchIcon from "@/assets/icons/search-icon";
import DropdownSearchContainer from "../dropdown-search-container";
import { Movie } from "@/types/movie";
import SearchDropdown from "../search-dropdown";

type Props = {
  searchToggleHandler: () => void;
  searchMovie: Movie[];
  searchInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function NavbarWeb({
  searchMovie,
  searchToggleHandler,
  searchInputHandler,
}: Props) {
  // const [movieHover, setMovieHover] = useState(false);
  // const [seriesHover, setSeriesHover] = useState(false);
  const [otherHover, setOtherHover] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // const movieHoverIn = () => {
  //   setMovieHover(true);
  // };
  // const movieHoverOut = () => {
  //   setMovieHover(false);
  // };
  // const seriesHoverIn = () => {
  //   setSeriesHover(true);
  // };

  // const seriesHoverOut = () => {
  //   setSeriesHover(false);
  // };
  const otherHoverIn = () => {
    setOtherHover(true);
  };

  const otherHoverOut = () => {
    setOtherHover(false);
  };

  const searchFocusIn = () => {
    setSearchFocus(true);
  };

  const searchFocusOut = () => {
    setTimeout(() => {
      setSearchFocus(false);
    }, 1000);
  };

  return (
    <div className="flex lg:flex-1 items-center flex-row text-xl pt-3">
      {/* <div className="hidden flex-col lg:flex">
        <MenuDropdown
          path={`/movie`}
          onMouseOver={movieHoverIn}
          onMouseLeave={movieHoverOut}
        >
          <CamIcon size="1.6" />
          <p className="m-2">Movie</p>
          <ChevronDownIcon size="1.5" />
        </MenuDropdown>
        {movieHover && (
          <DropdownItemContainer
            onMouseOver={movieHoverIn}
            onMouseLeave={movieHoverOut}
          >
            <DropdownItem title="Marvel" path={`/official/Marvel`} />
            <DropdownItem title="DC" path={`/official/DC Entertainment`} />
            <DropdownItem title="Disney" path={`/official/Disney`} />
          </DropdownItemContainer>
        )}
      </div>
      <div className="hidden flex-col lg:flex">
        <MenuDropdown
          onMouseOver={seriesHoverIn}
          onMouseLeave={seriesHoverOut}
          path={`/series`}
        >
          <TvIcon size="1.4" />
          <p className="m-2">Series</p>
          <ChevronDownIcon size="1.5" />
        </MenuDropdown>
        {seriesHover && (
          <DropdownItemContainer
            onMouseOver={seriesHoverIn}
            onMouseLeave={seriesHoverOut}
          >
            <DropdownItem title="Netflix Series" path={`/official/Netflix`} />
            <DropdownItem
              title="Amazon Prime"
              path={`/official/Amazon Prime`}
            />
            <DropdownItem title="Disney+ Series" path={`/official/Disney+`} />
            <DropdownItem title="HBO Series" path={`/official/Hbo`} />
          </DropdownItemContainer>
        )}
      </div> */}
      <Link
        href={{
          pathname: "/movie",
        }}
        className="hidden lg:flex flex-row justify-center items-center p-2 px-4 hover:cursor-pointer hover:text-secondary"
      >
        <CamIcon size="1.6" />
        <p className="ml-2">Movie</p>
      </Link>
      <Link
        href={{
          pathname: "/series",
        }}
        className="hidden lg:flex flex-row justify-center items-center p-2 px-4 hover:cursor-pointer hover:text-secondary"
      >
        <TvIcon size="1.4" />
        <p className="ml-2">Series</p>
      </Link>
      <Link
        href={{
          pathname: "/anime",
        }}
        className="hidden lg:flex flex-row justify-center items-center p-2 px-4 hover:cursor-pointer hover:text-secondary"
      >
        <FilmIcon size="1.5" />
        <p className="ml-2">Anime</p>
      </Link>
      <Link
        href={{
          pathname: "/drama-korea",
        }}
        className="hidden lg:flex flex-row justify-center items-center p-2 px-4 hover:cursor-pointer hover:text-secondary"
      >
        <FilmIcon size="1.5" />
        <p className="ml-2">Drakor</p>
      </Link>
      <div className="hidden flex-col lg:flex">
        <MenuDropdown
          onMouseOver={otherHoverIn}
          onMouseLeave={otherHoverOut}
          // path={`/`}
        >
          <OpenFolderIcon size="1.5" />
          <p className="m-2">Other</p>
          <ChevronDownIcon size="1.5" />
        </MenuDropdown>
        {otherHover && (
          <DropdownItemContainer
            onMouseOver={otherHoverIn}
            onMouseLeave={otherHoverOut}
          >
            <DropdownItem title="Official" path={`/official`} />
            <DropdownItem title="Genre" path={`/genre`} />
            <DropdownItem title="Country" path={`/country`} />
            <DropdownItem title="Jadwal Rilis" path={`/jadwal-rilis`} />
          </DropdownItemContainer>
        )}
      </div>
      {/* <Link
        href={{
          pathname: "/genre",
        }}
        className="hidden lg:flex flex-row justify-center items-center p-2 px-4 hover:cursor-pointer hover:text-secondary"
      >
        <OpenFolderIcon size="1.5" />
        <p className="ml-2">Genre</p>
      </Link> */}
      <div className="flex flex-1 justify-end">
        <button
          aria-label="search-button"
          onClick={searchToggleHandler}
          className="lg:hidden"
        >
          <SearchIcon color="#fff" size="1.5" />
        </button>
        <div className="hidden flex-col lg:flex">
          <SearchDropdown>
            <div className="hidden lg:flex flex-row items-center  bg-[#2E2E2C] rounded py-2 px-4 ">
              <input
                ref={searchInputRef}
                onFocus={searchFocusIn}
                onBlur={searchFocusOut}
                onChange={searchInputHandler}
                className="flex bg-[#2E2E2C] outline-none w-[100%] min-w-[20px] text-gray-200 text-xl"
                placeholder="search..."
              />
              <Link
                href={{
                  pathname: `${
                    searchInputRef.current?.value != undefined &&
                    searchInputRef.current?.value.length > 1
                      ? `/search/${searchInputRef.current?.value}`
                      : "/"
                  }`,
                }}
              >
                <SearchIcon color="#ccc" size="1.5" />
              </Link>
            </div>
          </SearchDropdown>
          {searchFocus && (
            <DropdownSearchContainer
              searchInput={searchInputRef.current?.value}
              searchMovie={searchMovie}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarWeb;
