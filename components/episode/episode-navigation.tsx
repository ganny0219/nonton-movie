import BurgerIcon from "@/assets/icons/burger-icon";
import ChevronLeftIcon from "@/assets/icons/chevron-left-icon";
import ChevronRightIcon from "@/assets/icons/chevron-right-icon";
import { Episode } from "@/types/movie";
import Link from "next/link";
import React from "react";

type Props = {
  mainEpisode: Episode;
  allEpisode: Episode[];
};

function EpisodeNavigation({ mainEpisode, allEpisode }: Props) {
  const episodeIndex = allEpisode.findIndex((eps) => eps.id == mainEpisode.id);
  return (
    <div className="flex flex-row md:text-xl text-center bg-[#414141] mb-6 shadow-md">
      {episodeIndex == 0 ? (
        <div className="flex-1 flex flex-row items-center justify-center border-r-2 border-[#313131] py-2 text-[#ffffff50]">
          <div className="mr-4">
            <ChevronLeftIcon size="1.2" />
          </div>
          Prev
        </div>
      ) : (
        <Link
          className="flex-1 flex flex-row items-center justify-center border-r-2 border-[#313131] py-2"
          href={{
            pathname: `/episode/${allEpisode[episodeIndex - 1].slug}`,
          }}
        >
          <div className="mr-4">
            <ChevronLeftIcon size="1.2" />
          </div>
          Prev
        </Link>
      )}
      <Link
        href={{
          pathname: `/${mainEpisode.season?.movie?.type}/${mainEpisode.season?.movie?.slug}`,
        }}
        className="flex-1 flex flex-row justify-center items-center py-2"
      >
        <div className="mr-4">
          <BurgerIcon size="1.2" />
        </div>
        All
      </Link>
      {episodeIndex == allEpisode.length - 1 ? (
        <div className="flex-1 flex flex-row justify-center items-center border-l-2 border-[#313131] py-2 text-[#ffffff50]">
          Next
          <div className="ml-4">
            <ChevronRightIcon size="1.2" />
          </div>
        </div>
      ) : (
        <Link
          className="flex-1 flex flex-row justify-center items-center border-l-2 border-[#313131] py-2"
          href={{
            pathname: `/episode/${allEpisode[episodeIndex + 1].slug}`,
          }}
        >
          Next
          <div className="ml-4">
            <ChevronRightIcon size="1.2" />
          </div>
        </Link>
      )}
    </div>
  );
}

export default EpisodeNavigation;
