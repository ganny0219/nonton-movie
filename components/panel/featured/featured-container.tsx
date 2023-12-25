import FieldHorizontal from "@/components/field/field-horizontal";
import Line from "@/components/line";
import React, { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import axios from "axios";
import { Featured, FeaturedData } from "@/types/featured";
import MovieFeaturedItem from "./movie-featured-item";
import { apiAxios } from "@/utils/axios";

type Props = {
  title: string;
  movie: Movie[];
  featuredData: Featured[];
  setFeaturedData: React.Dispatch<React.SetStateAction<FeaturedData>>;
};

function FeaturedContainer({
  title,
  movie,
  featuredData,
  setFeaturedData,
}: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [searchData, setSearchData] = useState<Movie[]>([]);
  const [focusInput, setFocusInput] = useState(false);
  const tambahFeaturedValidation = selectedMovie != undefined;

  const onSelectedMovie = (
    e: React.MouseEvent<HTMLButtonElement>,
    selectMovie: Movie
  ) => {
    e.preventDefault();
    setSelectedMovie(selectMovie);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const prevMovie = [...movie];
    const newMovie = [];
    if (e.target.value == "") {
      return setSearchData([]);
    }
    for (let movie of prevMovie) {
      if (
        movie.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        movie.imdbId.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        newMovie.push(movie);
      }
    }
    setSearchData(newMovie);
  };

  const onTambahFeatured = async () => {
    setSelectedMovie(undefined);
    const result = await apiAxios
      .post(`/featured/create`, {
        featured: {
          type: title,
          movie: selectedMovie,
        },
      })
      .then((res) => res.data);
    setFeaturedData((prev) => {
      const newDayData = prev[title.toLowerCase()]
        ? [result, ...prev[title.toLowerCase()]]
        : [result];
      return {
        ...prev,
        [title.toLowerCase()]: newDayData,
      };
    });
  };

  return (
    <div className="flex flex-col p-2 w-[80%] my-6 max-w-[1100px] m-auto bg-tertiary rounded-md">
      <h3 className="text-4xl p-2">{title}</h3>
      <div className="flex flex-row items-center">
        <div className="flex flex-col w-[100%]">
          <input
            onFocus={() => setFocusInput(true)}
            onBlur={() => {
              setTimeout(() => {
                setFocusInput(false);
              }, 1000);
            }}
            list="movieList"
            className=" outline-none p-1 w-full mr-2"
            placeholder="Search..."
            onChange={onSearch}
          />
          <div className="relative w-full">
            {focusInput && (
              <div className="absolute w-full flex flex-col max-h-60 overflow-x-hidden overflow-y-auto">
                {searchData.map((movie, movieIndex) => {
                  return (
                    <button
                      onClick={(e) => onSelectedMovie(e, movie)}
                      className="border-t-[1px] border-solid border-[#31313170] w-full outline-none p-1 mr-2  bg-[#fff]"
                      key={movieIndex}
                    >
                      <p className="truncate">{movie.title}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <FieldHorizontal
          disabled
          name="Title"
          value={selectedMovie ? selectedMovie.title : ""}
        />
        <FieldHorizontal
          disabled
          name="Imdb"
          value={selectedMovie ? selectedMovie.imdbId : ""}
        />
        <button
          disabled={!tambahFeaturedValidation}
          className={`ml-2 rounded ${
            tambahFeaturedValidation ? "bg-[#fff]" : "bg-[#ffffff90]"
          } p-1`}
          onClick={onTambahFeatured}
        >
          Tambah
        </button>
      </div>
      <Line thin />
      {featuredData?.length > 0 ? (
        featuredData.map((featured, featuredIndex) => {
          return (
            <MovieFeaturedItem
              key={featuredIndex}
              featured={featured}
              featuredIndex={featuredIndex}
              setFeaturedData={setFeaturedData}
            />
          );
        })
      ) : (
        <div className="flex flex-1 justify-center items-center text-2xl">
          No Data
        </div>
      )}
    </div>
  );
}

export default FeaturedContainer;
