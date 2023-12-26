"use client";
import React, { useEffect, useState } from "react";
import StarRating from "./star-rating";
import ProfileIcon from "@/assets/icons/profile-icon";
import Line from "@/components/line";
import { Movie } from "@/types/movie";
import { convertRating } from "@/utils/client-function/global";

type Props = {
  data: Movie;
};

function RatingDetailMobileMovie({ data }: Props) {
  const [rating, setRating] = useState(+data.rating);
  return (
    <div className="flex lg:hidden flex-col">
      <Line thin />
      <div className="flex flex-row items-center my-2">
        <p className="bg-[#313131] p-4 text-[#fff] mr-2 rounded text-2xl">
          {/* {(+rating).toFixed(1)} */}
          {convertRating(rating.toString())}
        </p>
        <StarRating
          movieId={data.id}
          totalRating={data.totalRating}
          rating={+data.rating}
          vote={data.vote}
          setRating={setRating}
          isMobile
        />
      </div>
    </div>
  );
}

export default RatingDetailMobileMovie;
