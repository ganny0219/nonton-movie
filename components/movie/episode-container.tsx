import { Episode, Movie } from "@/types/movie";
import React, { ReactNode } from "react";
import MovieCard from "./movie-card";
import EpisodeCard from "./episode-card";
import Link from "next/link";

type Props = {
  episodeList: Episode[];
  page?: boolean;
  seeAllpath?: string;
};

function EpisodeContainer({ seeAllpath, episodeList, page }: Props) {
  return (
    <div className="flex flex-col border-b-[1px] border-[#363636] border-solid py-4">
      <div className="flex flex-row  items-center text-white py-4 ">
        <div className="w-[3px] truncate h-[1em] bg-secondary mr-2 md:mr-4" />
        <h3 className="flex-1 truncate md:text-2xl">EPISODE TERBARU</h3>
        {!page && (
          <Link
            href={{ pathname: seeAllpath }}
            className="bg-secondary px-2 py-1 text-[0.5rem] md:text-xs font-bold rounded text-[#313131]"
          >
            SEE ALL
          </Link>
        )}
      </div>
      <div
        className={`grid ${
          page ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"
        } grid-rows-1 gap-4 w-full`}
      >
        {episodeList?.map((episode, movieIndex) => {
          {
            movieIndex < 18;
            return (
              <EpisodeCard
                key={movieIndex}
                episode={episode}
                index={movieIndex}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default EpisodeContainer;
