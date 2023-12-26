"use client";
import React, { useRef, useState } from "react";
import { Actor, Director, Movie, Writer } from "@/types/movie";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { updateMovieData } from "@/store/movie";
import FieldHorizontal from "@/components/field/field-horizontal";
import EditButton from "@/components/button/edit-button";
import { apiAxios } from "@/utils/axios";

type Props = {
  type: string;
  data: Writer[] | Actor[] | Director[];
  updateMode?: boolean;
};

function CastInput({ type, data, updateMode }: Props) {
  const [name, setName] = useState("");
  const [editCast, setEditCast] = useState(updateMode ? true : false);
  const movieData = useSelector((state: RootState) => state.movie);
  const removedCast = useRef<string[]>([]);
  const dispatch = useDispatch();

  const inputNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onTambahCast = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (name != "") {
      dispatch(
        updateMovieData({
          [type.toLowerCase()]: [
            ...data,
            {
              name: name,
              as: type.toLowerCase(),
              imageUrl: "",
            },
          ],
        })
      );
      setName("");
    }
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    castIndex: number
  ) => {
    const castType = type.toLowerCase();
    const newCastData = [...movieData[castType]];
    newCastData[castIndex] = {
      ...newCastData[castIndex],
      [key]: e.target.value,
    };
    dispatch(
      updateMovieData({
        [castType]: newCastData,
      })
    );
  };

  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    castIndex: number
  ) => {
    const castType = type.toLowerCase();
    const newCastData = [...movieData[castType]];
    removedCast.current.push(newCastData[castIndex].name);
    newCastData.splice(castIndex, 1);
    dispatch(updateMovieData({ [castType]: newCastData }));
  };

  const editCastToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editCast) {
      await apiAxios.patch(`/movie/update-cast`, {
        removedCast: removedCast.current,
        castData: movieData[type.toLowerCase()],
        movieId: movieData.id,
        type: type.toLowerCase(),
      });
      return setEditCast((prev) => !prev);
    }
    setEditCast((prev) => !prev);
  };

  return (
    <div className="bg-[#ffffff80] flex flex-col px-2 mt-6 rounded">
      <div className="flex flex-row items-center my-4">
        <h2 className="text-xl mr-4">{type}</h2>
        <input
          disabled={editCast}
          value={name}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              onTambahCast();
            }
          }}
          onChange={inputNameHandler}
          className="mr-4 rounded outline-none px-2"
          placeholder={`Add ${type}`}
        />
        <button
          disabled={editCast}
          className="bg-[#fff] px-2 h-auto aspect-square rounded"
          onClick={onTambahCast}
        >
          +
        </button>
        {updateMode && (
          <EditButton
            edit={editCast}
            toggleHandler={editCastToggle}
            title={type}
          />
        )}
      </div>
      {data.map((cast, castIndex) => {
        return (
          <div key={castIndex} className="flex flex-row items-center">
            <FieldHorizontal
              disabled={editCast}
              name="Name"
              value={cast?.name}
              conf={{
                onChange: (e) => inputChangeHandler(e, "name", castIndex),
              }}
            />

            <FieldHorizontal
              disabled={editCast}
              name="As"
              value={cast?.as}
              conf={{
                onChange: (e) => inputChangeHandler(e, "as", castIndex),
              }}
            />

            <FieldHorizontal
              disabled={editCast}
              name="Photo Url"
              value={cast?.imageUrl}
              conf={{
                onChange: (e) => inputChangeHandler(e, "imageUrl", castIndex),
              }}
            />
            {!editCast && (
              <button
                className="bg-red-500 p-1 w-[10%] rounded justify-center items-center"
                onClick={(e) => onDelete(e, castIndex)}
              >
                x
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CastInput;
