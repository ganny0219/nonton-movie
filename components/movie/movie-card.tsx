"use client";
import PlayIcon from "@/assets/icons/play-icon";
import { RootState } from "@/store";
import type { Movie } from "@/types/movie";
import { convertRating } from "@/utils/client-function/global";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  data: Movie;
  index: number;
};

function MovieCard({ data, index }: Props) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

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
          pathname: `/${data.type}/${data.slug}`,
        }}
        className="relative aspect-story overflow-hidden rounded-xl hover:cursor-pointer"
        onMouseOver={hoverIn}
        onMouseLeave={hoverOut}
      >
        <Image
          loading="lazy"
          title={`${data?.title}`}
          width={200}
          height={200}
          quality={20}
          alt={`Nonton Film ${data?.title}`}
          className={` ${
            !isMobile ? (!hovered ? "scale-100" : "scale-150") : ""
          } `}
          src={data.poster}
        />
        {!isMobile && (
          <>
            <div
              className={`absolute left-0 top-0 w-full h-full flex justify-center items-center bg-[#ffffff50] backdrop-blur-sm duration-1000 ${
                !hovered && !isMobile ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`absolute flex justify-center items-center m-auto top-0 right-0 left-0 bottom-0 duration-500 ${
                !hovered ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="text-[3em] sm:text-[5em]">
                <PlayIcon color="#313131" />
              </div>
            </div>
          </>
        )}
        {data.resolution && (
          <p className="absolute left-0 top-0 flex justify-center items-center bg-secondary text-[#313131] font-bold rounded rounded-s-none rounded-t-none px-1 sm:px-2 py-1 text-[0.5em] sm:text-xs">
            {data.resolution}
          </p>
        )}
        <p
          className={`absolute right-0 bottom-0  items-center flex bg-secondary text-[#313131] font-bold rounded rounded-e-none rounded-b-none px-2 py-1 text-[0.5em] sm:text-xs duration-[1000ms] ${
            !hovered && !isMobile ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* {(+data.rating).toFixed(1)} */}
          {convertRating(data.rating)}
        </p>
      </Link>
      <Link
        href={{
          pathname: `/${data.type}/${data.slug}`,
        }}
      >
        <h2
          title={data.title}
          className="text-[#fff] text-sm md:text-base mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden hover:text-secondary"
        >
          {data.title}
        </h2>
      </Link>
      <p className="text-[#ffffff80] text-xs">{data.year}</p>
    </div>
  );
}

export default MovieCard;
