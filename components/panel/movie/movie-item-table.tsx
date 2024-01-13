import { Movie } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import DeleteConfirm from "@/components/delete-confirm";
import { apiAxios } from "@/utils/axios";

type Props = {
  odd?: boolean;
  data: Movie;
  movieIndex: number;
  type: string;
  setMovieList: React.Dispatch<React.SetStateAction<Movie[]>>;
};

function MovieItemTable({ odd, type, data, setMovieList, movieIndex }: Props) {
  const [deleteMovieModal, setDeleteMovieModal] = useState(false);
  const onDeleteMovie = async () => {
    await apiAxios.delete(`/movie/delete`, {
      params: {
        movieId: data.id,
      },
    });
    setDeleteMovieModal(false);
    setMovieList((prevMovie) => {
      const newMovie = [...prevMovie];
      newMovie.splice(movieIndex, 1);
      return newMovie;
    });
  };
  return (
    <>
      <DeleteConfirm
        visible={deleteMovieModal}
        onConfirm={onDeleteMovie}
        onClose={setDeleteMovieModal}
      />
      <div
        className={`flex flex-row w-full text-md ${
          odd ? "bg-slate-100" : "bg-slate-50"
        }`}
      >
        <div className="flex items-center py-2 w-[20%] border-solid border-[1px] border-black border-t-0 pl-2">
          {data?.imdbId}
        </div>
        <div className="flex flex-1 items-center py-2 border-solid border-[1px] border-l-0 border-black border-t-0 pl-2">
          {data?.title}
        </div>
        <div className="flex flex-1 items-center py-2 border-solid border-[1px] border-l-0 border-black border-t-0 pl-2">
          {data?.originalTitle}
        </div>
        <div className="flex justify-evenly items-center py-2 w-[20%] border-solid border-[1px] border-l-0 border-black border-t-0 pl-2">
          <Link
            href={{
              pathname: `/pandora/${type}/${data.id}`,
            }}
            className="bg-red-100 p-2 rounded"
          >
            Edit
          </Link>
          <button
            className="bg-red-100 p-2 rounded"
            onClick={() => setDeleteMovieModal(true)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default MovieItemTable;
