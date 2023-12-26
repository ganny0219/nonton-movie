"use client";
import EditButton from "@/components/button/edit-button";
import FieldHorizontal from "@/components/field/field-horizontal";
import { RootState } from "@/store";
import { updateMovieData } from "@/store/movie";
import { Genre, Movie } from "@/types/movie";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

type Props = {
  updateMode?: boolean;
};

function GenreInput({ updateMode }: Props) {
  const movieData = useSelector((state: RootState) => state.movie);
  const { id: movieId } = movieData;
  const genre = movieData.genre;
  const [name, setName] = useState("");
  const [editGenre, setEditGenre] = useState(updateMode ? true : false);

  const removedGenre = useRef<string[]>([]);
  const dispatch = useDispatch();

  const inputNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onDelete = (index: number) => {
    removedGenre.current.push(genre[index].name);
    const newGenre = [...genre];
    newGenre.splice(index, 1);
    dispatch(updateMovieData({ genre: newGenre }));
  };

  const onTambahGenre = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (name != "") {
      const newGenre = [...genre, { name: name }];
      dispatch(updateMovieData({ genre: newGenre }));
      setName("");
    }
  };

  const editGenreToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editGenre) {
      await apiAxios
        .patch(`/movie/update-genre`, {
          removedGenre: removedGenre.current,
          genreData: genre,
          movieId,
        })
        .then((res) => {
          dispatch(updateMovieData({ genre: res.data }));
        });
      return setEditGenre((prev) => !prev);
    }
    setEditGenre((prev) => !prev);
  };

  return (
    <div className="bg-[#ffffff80] flex flex-col px-2 mt-6 rounded">
      <div className="flex flex-row items-center my-4">
        <h3 className="text-xl mr-4">Genre</h3>
        <input
          value={name}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              onTambahGenre();
            }
          }}
          disabled={editGenre}
          onChange={inputNameHandler}
          className="mr-4 rounded outline-none px-2"
          placeholder={`Add Genre`}
        />
        <button
          disabled={editGenre}
          className="bg-[#fff] px-2 h-auto aspect-square rounded"
          onClick={onTambahGenre}
        >
          +
        </button>
        {updateMode && (
          <EditButton
            edit={editGenre}
            toggleHandler={editGenreToggle}
            title="Genre"
          />
        )}
      </div>
      <div className="flex flex-row flex-wrap">
        {genre?.map((genre, index) => {
          return (
            <div
              key={index}
              className={`${
                editGenre ? "bg-[#ffffff90] text-[#31313190]" : ""
              } flex flex-row justify-center items-center bg-[#fff] rounded-full px-4 py-1 mb-2 mx-2`}
            >
              <p className="mr-2">{genre.name}</p>
              <button
                disabled={editGenre}
                className="border-solid border-l-[1px] border-[#00000060] pl-1"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(index);
                }}
              >
                <p>X</p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GenreInput;
