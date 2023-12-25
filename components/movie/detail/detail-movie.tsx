import React from "react";
import RatingDetailMovie from "./rating-detail-movie";
import GenreListMovie from "./genre-list-movie";
import Line from "@/components/line";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import RatingDetailMobileMovie from "./rating-detail-mobile-movie";

type Props = {
  data: Movie;
};

function DetailMovie({ data }: Props) {
  const isMobile = false;
  return (
    <>
      <div className="flex flex-row mt-4">
        <div className="w-[12%] max-w-[140px] min-w-[110px]">
          <Image
            loading="lazy"
            title={`${data?.title}`}
            className="aspect-story object-cover"
            height={400}
            width={400}
            alt={`Nonton Film ${data?.title}`}
            src={data?.poster ? data.poster : "/img/no-profile-img.jpg"}
          />
        </div>
        <div className="flex flex-col ml-4 w-full">
          <h1 className="md:text-2xl break-words">{data?.title}</h1>
          {/* {movie.type === "movie" && <p>Captain Marvel Mantap</p>} */}
          <div
            className={`${
              isMobile ? "grid grid-cols-2 gap-2" : ""
            } text-xs mt-[2px]`}
          >
            {data?.type === "movie" ? (
              <>
                <span className="mr-4">{data?.country}</span>
                <span className="mr-4">{data?.runtime}.</span>
                <span className="mr-4">{data?.released}</span>
                <span className="mr-4">{data?.rated}</span>
              </>
            ) : (
              <>
                <span className="mr-4">{data?.country}</span>
                <span className="mr-4">{data?.runtime}.</span>
                <span className="mr-2">{data?.released}</span>
                <span className="mr-2">{data?.production}</span>
              </>
            )}
          </div>
          <RatingDetailMovie data={data} />
          <GenreListMovie genres={data?.genre} />
        </div>
      </div>
      <RatingDetailMobileMovie data={data} />
    </>
  );
}

export default DetailMovie;
