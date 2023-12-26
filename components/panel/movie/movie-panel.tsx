"use client";
import Line from "@/components/line";
import { Movie } from "@prisma/client";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import MovieHeaderTable from "./movie-header-table";
import MovieItemTable from "./movie-item-table";
import { title } from "process";
import ReactPaginate from "react-paginate";
import ChevronRightIcon from "@/assets/icons/chevron-right-icon";
import ChevronLeftIcon from "@/assets/icons/chevron-left-icon";

type Props = {
  movie: Movie[];
  type: string;
  title: string;
};
const nextButton: ReactNode = (
  <div className="flex justify-center items-center bg-[#ccc] w-10 aspect-square rounded">
    <ChevronRightIcon />
  </div>
);

const prevButton: ReactNode = (
  <div className="flex justify-center items-center bg-[#ccc] w-10 aspect-square rounded">
    <ChevronLeftIcon />
  </div>
);

function MoviePanel({ movie, title, type }: Props) {
  const [movieList, setMovieList] = useState<Movie[]>(movie);
  const [camToggle, setCamToggle] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const itemsPerPage = 30;
  // const [searchInput, setSearchInput] = useState("");
  const onFilterCam = () => {
    if (!camToggle) {
      const newMovieData = movie.filter((mov) => mov.resolution == "CAM");
      setMovieList(newMovieData);
      setCamToggle(true);
    } else {
      setMovieList(movie);
      setCamToggle(false);
    }
  };
  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieList((prev) => {
      setSelectedPage(0);
      if (e.target.value != "") {
        const prevMovie = [...movie];
        const newMovie = [];
        for (let movie of prevMovie) {
          if (
            movie.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            movie.imdbId.toLowerCase().includes(e.target.value.toLowerCase())
          ) {
            newMovie.push(movie);
          }
        }
        const newOffset = (0 * itemsPerPage) % newMovie.length;
        setItemOffset(newOffset);
        return newMovie;
      }
      const newOffset = (0 * itemsPerPage) % movie.length;
      setItemOffset(newOffset);
      return movie;
    });
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = movieList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(movieList.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % movieList.length;
    setItemOffset(newOffset);
    setSelectedPage(event.selected);
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center px-4 mt-4 mb-2 ">
        <h1 className="text-xl">{title} List</h1>
        <div>
          <input
            onChange={searchInputHandler}
            className="bg-[#cccccc70] mr-4 rounded px-2 py-2 outline-none"
            placeholder="Search..."
          />
          <button
            className="bg-tertiary py-1 px-4 rounded mr-4"
            onClick={onFilterCam}
          >
            {camToggle ? "ALL" : "CAM"}
          </button>
          <Link
            href={{ pathname: `/pandora/${type}/create` }}
            className="bg-tertiary py-2 px-4 rounded"
          >
            Create {title}
          </Link>
        </div>
      </div>
      <Line thin color="#00000050" />
      <div className="p-2">
        <MovieHeaderTable />
        {currentItems?.map((movie, movieIndex) => {
          return (
            <MovieItemTable
              type={type}
              key={movieIndex}
              movieIndex={movieIndex}
              data={movie}
              odd={movieIndex % 2 == 0}
              setMovieList={setMovieList}
            />
          );
        })}
        <ReactPaginate
          forcePage={selectedPage}
          breakLabel=". . ."
          nextLabel={nextButton}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={prevButton}
          containerClassName="flex flex-row justify-center items-center w-full my-6"
          activeClassName="bg-secondary text-black"
          pageClassName="flex justify-center items-center p-2 bg-[#cccccc70] mx-2 aspect-square w-10 rounded"
        />
      </div>
    </>
  );
}

export default MoviePanel;
