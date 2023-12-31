"use client";
import React, { useState } from "react";

import Line from "@/components/line";
import { Season } from "@/types/movie";
import StarSeasonRating from "./star-season-rating";
import { convertRating } from "@/utils/client-function/global";
type Props = {
  data: Season;
};

function RatingDetailMobileSeason({ data }: Props) {
  const [rating, setRating] = useState(+data.rating);
  return (
    <div className="flex lg:hidden flex-col">
      <Line thin />
      <div className="flex flex-row items-center my-2">
        <p className="bg-[#313131] p-4 text-[#fff] mr-2 rounded text-2xl">
          {/* {(+rating).toFixed(1)} */}
          {convertRating(rating.toString())}
        </p>
        <StarSeasonRating
          seasonId={data.id}
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

export default RatingDetailMobileSeason;
