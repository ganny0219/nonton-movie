import React, { useEffect, useState } from "react";
import EpisodeItem from "./episode-item";
import { Episode, Season } from "@/types/movie";
import StarIcon from "@/assets/icons/star-icon";
import FilledStarIcon from "@/assets/icons/filled-star-icon";
import { convertRating } from "@/utils/client-function/global";

type Props = {
  season: Season[];
};

function Season({ season }: Props) {
  const [open, setOpen] = useState(0);
  const openHandler = (sesasonIndex: number) => {
    if (sesasonIndex == open) {
      return setOpen(-1);
    }
    setOpen(sesasonIndex);
  };
  useEffect(() => {
    setOpen(0);
  }, [season]);
  return (
    <>
      <h2 className="text-2xl my-2 mb-6">Season and Episodes</h2>
      {season.map((season, seasonIndex) => {
        return (
          <div
            key={seasonIndex}
            className="flex flex-col w-full  my-1"
            onClick={() => openHandler(seasonIndex)}
          >
            <div className="flex flex-row items-center bg-[#31313190] hover:cursor-pointer">
              <div
                className={`flex justify-center items-center min-w-[90px] w-[10%] max-w-[120px] aspect-video text-[#313131] text-xl ${
                  open == seasonIndex ? "bg-secondary" : "bg-white"
                }`}
              >
                {season.sequence}
              </div>
              <div className="flex justify-center w-[12%] min-w-[70px]  md:text-lg ml-2">
                {season.name}
              </div>
              <div className="text-sm pl-2">{season.released}</div>
              <div className="flex flex-1 flex-row justify-end items-center mr-4 sm:mr-6">
                <FilledStarIcon size="1.1" />
                <p className="ml-1 sm:ml-2 sm:text-lg">
                  {convertRating(season.rating)}
                </p>
              </div>
            </div>
            {open == seasonIndex && (
              <>
                <div className="flex flex-col">
                  {season.episode?.map((episode, episodeIndex) => {
                    return (
                      <EpisodeItem
                        seasonSquence={season.sequence}
                        key={episodeIndex}
                        episode={episode}
                        episodeIndex={episodeIndex}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default Season;
