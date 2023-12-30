import PlayIcon from "@/assets/icons/play-icon";

import type { Season } from "@/types/movie";
import { convertRating } from "@/utils/client-function/global";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  mainPage: boolean;
  data: Season;
  index: number;
};

function JadwalRilisSeasonCard({ data, index, mainPage }: Props) {
  const [hovered, setHovered] = useState(false);
  const hoverIn = () => {
    setHovered(true);
  };
  const hoverOut = () => {
    setHovered(false);
  };
  return (
    <div className="flex flex-col">
      <Link
        href={{
          pathname: `${
            mainPage ? `/series/${data.movie?.slug}` : `/season/${data.slug}`
          }`,
        }}
        className="relative aspect-story overflow-hidden rounded-xl hover:cursor-pointer"
        onMouseOver={hoverIn}
        onMouseLeave={hoverOut}
      >
        <Image
          loading="lazy"
          title={`${data?.movie?.title} ${data.name}`}
          fill
          quality={20}
          alt={`Nonton Film ${data?.movie?.title} ${data.name}`}
          className={`${!hovered ? "scale-100" : "scale-150"} aspect-story`}
          src={data.poster ? data.poster : "/img/no-img.jpg"}
        />
        <div
          className={`absolute left-0 top-0 w-full h-full flex justify-center items-center bg-[#ffffff50] backdrop-blur-sm duration-1000 ${
            !hovered ? "opacity-0" : "opacity-100"
          }`}
        ></div>

        <div
          className={`absolute flex flex-col justify-center items-center m-auto top-0 right-0 left-0 bottom-0 duration-500 ${
            !hovered ? "opacity-0" : "opacity-100"
          } text-[#313131] font-bold text-center`}
        >
          {mainPage ? (
            <div className="text-[3em] sm:text-[5em]">
              <PlayIcon color="#313131" />
            </div>
          ) : (
            <>
              <p className="text-[1em] sm:text-[1.2em]">Season</p>
              <p className="text-[2em] sm:text-[4em]">{data.sequence}</p>
              <p className="text-[0.8em] sm:text-[1.2em] line-clamp-2 w-[90%]">
                {data.movie?.title}
              </p>
            </>
          )}
        </div>
        {mainPage && (
          <>
            {data.movie?.resolution && (
              <p className="absolute left-0 top-0 flex justify-center items-center bg-secondary text-[#313131] font-bold rounded rounded-s-none rounded-t-none px-1 sm:px-2 py-1 text-[0.5em] sm:text-xs">
                {data.movie?.resolution}
              </p>
            )}
            <div
              className={`absolute right-0 bottom-0  items-center flex bg-secondary text-[#313131] font-bold rounded rounded-e-none rounded-b-none px-2 py-1 text-[0.5em] sm:text-xs duration-[1000ms] ${
                !hovered ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* {(+data.rating).toFixed(1)} */}
              {convertRating(data.rating)}
            </div>
          </>
        )}
      </Link>
      <Link
        href={{
          pathname: `${
            mainPage ? `/series/${data.movie?.slug}` : `/season/${data.slug}`
          }`,
        }}
      >
        <p className="text-[#fff]  text-sm sm:text-base  mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden hover:text-secondary">
          {`S${data.sequence} : ${data.movie?.title}`}
        </p>
      </Link>
      <p className="text-[#ffffff80] text-xs">{data.released}</p>
    </div>
  );
}

export default JadwalRilisSeasonCard;
