import { RootState } from "@/store";
import { Episode } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  seasonSquence: number | undefined;
  episode: Episode;
  episodeIndex: number;
};
function EpisodeItem({ episode, episodeIndex, seasonSquence }: Props) {
  return (
    <Link
      href={{ pathname: `/episode/${episode.slug}` }}
      className={`flex flex-col relative w-full mt-2 ${
        episodeIndex > 0
          ? "pt-2 border-t-solid border-t-[1px] border-[#313131]"
          : ""
      }`}
    >
      {/* <div className="absolute bg-[#00000070] w-full h-full top-0 left-0" /> */}
      <div className="flex flex-row items-center w-full">
        <Image
          loading="lazy"
          title={`${episode.season?.movie?.title} ${episode.season?.name} Episode ${episode.sequence}`}
          height={400}
          width={400}
          alt={`Nonton Film ${episode.season?.movie?.title} ${episode.season?.name} Episode ${episode.sequence}`}
          src={episode?.poster ? episode.poster : "/img/no-img.jpg"}
          className="w-[10%] object-cover h-auto aspect-video max-w-[120px] min-w-[90px] text-[#313131] text-xl bg-secondary"
        />
        <p className="flex justify-center text-xs md:text-base w-[8%] min-w-[70px]">
          {seasonSquence} - {episode?.sequence}
        </p>
        <div className="flex flex-col border-l-[1px] truncate border-[#313131] border-solid pl-4 ">
          <p className="hover:text-secondary truncate ">{episode?.title}</p>
          <p className="text-xs">{episode?.released}</p>
        </div>
      </div>
    </Link>
  );
}

export default EpisodeItem;
