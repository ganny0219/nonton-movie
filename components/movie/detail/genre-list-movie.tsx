import { Genre } from "@/types/movie";
import Link from "next/link";
import React from "react";

type Props = {
  genres: Genre[];
};

function GenreListMovie({ genres }: Props) {
  return (
    <div className="flex-warp flex-row mt-2">
      {genres?.map((genre, genreIndex) => {
        return (
          <div
            key={genreIndex}
            className="flex flex-row text-xs md:text-base float-left"
          >
            {genreIndex != 1 && genreIndex != 0 && (
              <div className="mr-2">|</div>
            )}
            <a
              key={genreIndex}
              href={`/genre/${genre.name.toLowerCase()}`}
              className="mr-2 hover:text-secondary"
            >
              {genre.name}
            </a>
            {genres.length > 1 && genreIndex == 0 && (
              <div className="mr-2">|</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default GenreListMovie;
