import Line from "@/components/line";
import DrawerPanel from "@/components/panel/drawer-panel";
import React, { ReactNode, useEffect, useState } from "react";
import HeaderPanel from "@/components/panel/header-panel";
import RootPanel from "@/components/panel/root-panel";
import { useRouter } from "next/router";
import Link from "next/link";
import Loading from "@/components/loading";
import axios from "axios";
import { Movie } from "@prisma/client";
import MovieHeaderTable from "@/components/panel/movie/movie-header-table";
import MovieItemTable from "@/components/panel/movie/movie-item-table";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import ReactPaginate from "react-paginate";
import ChevronRightIcon from "@/assets/icons/chevron-right-icon";
import ChevronLeftIcon from "@/assets/icons/chevron-left-icon";
import { apiAxios } from "@/utils/axios";
import { getMovieListPanel } from "@/utils/server-function/movie";

type Props = {
  movie: Movie[];
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

function DrakorPanelPage({ movie }: Props) {
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
      <RootPanel selected="drama-korea">
        <div className="flex flex-row justify-between items-center px-4 mt-4 mb-2 ">
          <h1 className="text-xl">Drama Korea List</h1>
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
              href={{ pathname: "/pandora/drama-korea/create" }}
              className="bg-tertiary py-2 px-4 rounded"
            >
              Create Drakor
            </Link>
          </div>
        </div>
        <Line thin color="#00000050" />
        <div className="p-2">
          <MovieHeaderTable />
          {currentItems?.map((movie, movieIndex) => {
            return (
              <MovieItemTable
                type="drama-korea"
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
      </RootPanel>
    </>
  );
}

export default DrakorPanelPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/pandora/auth",
      },
    };
  }

  const movie = await getMovieListPanel("drama-korea");

  return {
    props: {
      movie: movie,
    },
  };
};
