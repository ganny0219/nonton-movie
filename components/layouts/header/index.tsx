"use client";
import React, { useEffect, useState } from "react";
import HeaderContainer from "./header-container";
import Link from "next/link";
import BurgerIcon from "@/assets/icons/burger-icon";
import NavbarMobile from "./navbar-mobile";
import NavbarWeb from "./navbar-web";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { apiAxios } from "@/utils/axios";
import GoogleAnalytic from "@/components/google-analytic";

type Props = {
  hidden?: boolean;
};

function Header({ hidden }: Props) {
  const [burgerToggle, setBurgerToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);
  useEffect(() => {
    const currentUrl = window.location.href;
    const isWithoutWWW = !currentUrl.includes("www.");
    const hasQueryString = !currentUrl.includes("?");
    if (isWithoutWWW && hasQueryString) {
      const canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      canonicalLink.href = currentUrl;
      document.head.appendChild(canonicalLink);
    }
  }, []);
  const burgerToggleHandler = () => {
    setBurgerToggle((prev) => {
      if (searchToggle) {
        setSearchToggle(false);
      }
      return !prev;
    });
  };

  const searchToggleHandler = () => {
    setSearchMovie([]);
    setSearchToggle((prev) => {
      if (burgerToggle) {
        setBurgerToggle(false);
      }
      return !prev;
    });
  };

  const searchInputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value == "") {
      return setSearchMovie([]);
    }
    const movieData = await apiAxios
      .get(`/movie/search`, {
        params: {
          search: e.target.value,
        },
      })
      .then((res) => res.data);
    setSearchMovie(movieData);
  };

  return (
    <>
      {process.env.NODE_ENV == "production" && <GoogleAnalytic />}
      <HeaderContainer>
        <div className="flex flex-row w-full items-center">
          <div className="flex flex-row text-gray-200 flex-1 justify-between lg:justify-normal">
            <button
              aria-label="burger-button"
              onClick={burgerToggleHandler}
              className="lg:hidden pt-3"
            >
              <BurgerIcon color="#fff" size="1.5" />
            </button>
            <a
              href={"/"}
              className="flex items-center w-[120px] sm:w-[200px] pl-0 p-2 px-4 hover:cursor-pointer text-2xl hover:text-secondary"
            >
              <Image
                loading="lazy"
                title="Moovie21 Logo"
                height={200}
                width={200}
                quality={20}
                src="/logo/moovie21-logo.png"
                alt={`Moovie21 Logo`}
              />
              {/* MOOVIE21*/}
            </a>
            <NavbarWeb
              searchMovie={searchMovie}
              searchToggleHandler={searchToggleHandler}
              searchInputHandler={searchInputHandler}
            />
          </div>
        </div>
      </HeaderContainer>
      <NavbarMobile
        searchInputHandler={searchInputHandler}
        searchMovie={searchMovie}
        burgerToggle={burgerToggle}
        searchToggle={searchToggle}
      />
    </>
  );
}

export default Header;
