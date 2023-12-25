import { Movie } from "@/types/movie";
import React, { ReactNode } from "react";
import MovieCard from "./movie-card";

type Props = {
  featuredMovie: Movie[];
};

async function FeaturedContainer({ featuredMovie }: Props) {
  return (
    <div className="flex flex-col border-b-[1px] border-[#363636] border-solid py-4">
      <div className="flex flex-row  items-center text-white py-4 ">
        <div className="w-[3px] h-[1em] bg-secondary mr-2 md:mr-4" />
        <h3 className="flex-1 truncate md:text-2xl">FEATURED</h3>
      </div>
      <div
        className={`grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4  grid-rows-1 gap-4 w-full`}
      >
        {featuredMovie.map((movie, movieIndex) => {
          {
            movieIndex < 18;
            return (
              <MovieCard key={movieIndex} data={movie} index={movieIndex} />
            );
          }
        })}
      </div>
    </div>
  );
}

export default FeaturedContainer;
