"use client";
import PlayIcon from "@/assets/icons/play-icon";
import { RootState } from "@/store";
import type { Episode, Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  episode: Episode;
  index: number;
};

function EpisodeCard({ episode, index }: Props) {
  const [hovered, setHovered] = useState(false);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const hoverIn = () => {
    setHovered(true);
  };
  const hoverOut = () => {
    setHovered(false);
  };
  let poster = "";
  if (episode.poster.includes("themoviedb")) {
    poster = episode.poster.replace("w227_and_h127_bestv2", "w500");
  } else {
    poster = episode.poster;
  }
  return (
    <div className="flex flex-col">
      <Link
        href={{ pathname: `/episode/${episode.slug}` }}
        className="relative overflow-hidden rounded-xl hover:cursor-pointer"
        onMouseOver={hoverIn}
        onMouseLeave={hoverOut}
      >
        <Image
          loading="lazy"
          title={`${episode.season?.movie?.title} ${episode.season?.name} Episode ${episode.sequence}`}
          height={400}
          width={400}
          alt={`Nonton Film ${episode.season?.movie?.title} ${episode.season?.name} Episode ${episode.sequence}`}
          className={`w-full object-cover aspect-video rounded-xl${
            !isMobile ? (!hovered ? "scale-100" : "scale-150") : ""
          }`}
          src={poster ? poster : "/img/no-img.jpg"}
        />
        {!isMobile && (
          <>
            <div
              className={`absolute left-0 top-0 w-full h-full flex justify-center items-center bg-[#ffffff50] backdrop-blur-sm duration-1000 ${
                !hovered ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`absolute flex justify-center items-center m-auto top-0 right-0 left-0 bottom-0 duration-500 ${
                !hovered ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="text-[3em] lg:text-[5em]">
                <PlayIcon color="#313131" />
              </div>
            </div>
          </>
        )}
        {episode.season?.movie?.resolution && (
          <p className="absolute left-0 top-0 flex justify-center items-center bg-secondary text-[#313131] font-bold rounded rounded-s-none rounded-t-none px-1 sm:px-2 py-1 text-[0.5em] sm:text-xs">
            {episode.season?.movie?.resolution}
          </p>
        )}
        {/* {!isMobile && (
          <p
            className={`absolute right-0 bottom-0 items-center flex bg-secondary font-bold text-[#313131] rounded rounded-e-none rounded-b-none px-2 py-1 text-[0.5em] sm:text-xs duration-[1000ms] ${
              !hovered ? "opacity-0" : "opacity-100"
            }`}
          >
            {episode.released}
          </p>
        )} */}
      </Link>
      <Link href={{ pathname: `/episode/${episode.slug}` }}>
        <h2
          title={episode.title}
          className="text-[#fff] text-sm sm:text-base mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden hover:text-secondary"
        >
          {episode.title}
          {/* {episode.season?.movie?.title} */}
        </h2>
      </Link>
      <div className="flex flex-row truncate">
        <p className="text-[#ffffff80] text-xs">
          S{episode.season?.sequence} E{episode.sequence} {" /"}
        </p>
        <p className="text-[#ffffff80] text-xs pl-1 truncate">
          {episode.released}
        </p>
      </div>
      <p className="text-[#ffffff80] text-xs truncate">
        {/* {episode.title} */}
        {episode.season?.movie?.title}
      </p>
    </div>
  );
}

export default EpisodeCard;
