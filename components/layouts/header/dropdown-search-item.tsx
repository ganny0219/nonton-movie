import ChevronRightIcon from "@/assets/icons/chevron-right-icon";
import FilledStarIcon from "@/assets/icons/filled-star-icon";
import StarIcon from "@/assets/icons/star-icon";
import { RootState } from "@/store";
import { Movie } from "@/types/movie";
import { convertRating } from "@/utils/client-function/global";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  movie: Movie;
};
function DropdownSearchItem({ movie }: Props) {
  return (
    <Link
      href={{ pathname: `/${movie.type}/${movie.slug}` }}
      className="flex aspect-story flex-row border-b-[1px] border-[#ffffff50] w-full max-w-[400px] lg:w-full p-2 "
    >
      <Image
        loading="lazy"
        title={movie.title}
        fill
        quality={10}
        alt={`Nonton Film ${movie.title}`}
        className="rounded w-[30%] object-contain mr-4"
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
    </Link>
  );
}

export default DropdownSearchItem;
