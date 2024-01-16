import FilledStarIcon from "@/assets/icons/filled-star-icon";
import { Movie } from "@/types/movie";
import { convertRating } from "@/utils/client-function/global";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  movie: Movie;
};
function DropdownSearchItem({ movie }: Props) {
  return (
    <a
      href={`/${movie.type}/${movie.slug}`}
      className="flex flex-row border-b-[1px] border-[#ffffff50] w-full p-2 "
    >
      <Image
        loading="lazy"
        title={movie.title}
        width={100}
        height={100}
        quality={20}
        alt={`Nonton Film ${movie.title}`}
        className="rounded w-[30%] object-contain aspect-story mr-4"
        src={movie.poster ? movie.poster : "/img/no-img.jpg"}
      />
      <div className="mt-4 lg:mt-0">
        <span
          title={movie.title}
          className="break-all line-clamp-1 hover:text-secondary"
        >
          {movie.title}
        </span>
        <div className="flex flex-row items-center">
          <FilledStarIcon />
          <p className="ml-2">{convertRating(movie.rating)}</p>
        </div>
      </div>
    </a>
  );
}

export default DropdownSearchItem;
