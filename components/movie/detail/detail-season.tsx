import React from "react";
import RatingDetailMovie from "./rating-detail-movie";
import GenreListMovie from "./genre-list-movie";
import Line from "@/components/line";
import Image from "next/image";
import { Movie, Season } from "@/types/movie";
import Link from "next/link";
import RatingDetailSeason from "./rating-detail-season";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import RatingDetailMobileSeason from "./rating-detail-mobile-season";

type Props = {
  data: Season;
};

function DetailSeason({ data }: Props) {
  const isMobile = false;
  return (
    <>
      <div className="flex flex-row mt-4">
        <div className="w-[12%] max-w-[140px] min-w-[110px] ">
          <Image
            loading="lazy"
            title={`${data?.movie?.title} ${data.name}`}
            className="aspect-story object-cover"
            height={400}
            width={400}
            alt={`Nonton Film ${data?.movie?.title} ${data.name}`}
            src={data?.poster ? data.poster : "/img/no-profile-img.jpg"}
          />
        </div>
        <div className="flex flex-col ml-4 w-full">
          <h1 className="text-2xl break-words ">
            {data?.movie?.title} {" : "}
            {data.name}
          </h1>
          {/* {movie.type === "movie" && <p>Captain Marvel Mantap</p>} */}
          <div
            className={`${
              isMobile ? "grid grid-cols-2 gap-2" : ""
            } text-xs mt-[2px]`}
          >
            <span className="mr-4">{data?.movie?.country}</span>
            <span className="mr-4">{data?.movie?.rated}</span>
            <span className="mr-4">{data?.released}</span>
            <span className="mr-4">{data?.movie?.production}</span>
          </div>
          <RatingDetailSeason data={data} />
          <Link
            className="hover:text-secondary mt-2 break-words"
            href={{ pathname: `/${data.movie?.type}/${data.movie?.slug}` }}
          >
            {data.movie?.title} All Season
          </Link>
        </div>
      </div>
      <RatingDetailMobileSeason data={data} />
    </>
  );
}

export default DetailSeason;
