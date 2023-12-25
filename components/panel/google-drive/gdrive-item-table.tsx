import { Movie } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import DeleteConfirm from "@/components/delete-confirm";
import { apiAxios } from "@/utils/axios";
import { GoogleDrive } from "@/types/google-drive";
import GDriveUpdateModal from "./gdrive-update-modal";

type Props = {
  odd?: boolean;
  data: GoogleDrive;
  gdriveIndex: number;
  setGdriveList: React.Dispatch<React.SetStateAction<GoogleDrive[]>>;
};

function GDriveItemTable({ odd, data, setGdriveList, gdriveIndex }: Props) {
  const [deleteMovieModal, setDeleteMovieModal] = useState(false);
  const [gdriveUpdateModal, setGdriveUpdateModal] = useState(false);
  const onDeleteMovie = async () => {
    await apiAxios.delete(`/google-drive/delete`, {
      params: {
        googleId: data.googleId,
      },
    });
    setDeleteMovieModal(false);
    setGdriveList((prevMovie) => {
      const newMovie = [...prevMovie];
      newMovie.splice(gdriveIndex, 1);
      return newMovie;
    });
  };

  const gdriveUpdateModalHandler = () => {
    setGdriveUpdateModal((prev) => !prev);
  };
  return (
    <>
      <GDriveUpdateModal
        gdrive={data}
        setGdriveList={setGdriveList}
        visible={gdriveUpdateModal}
        onClose={gdriveUpdateModalHandler}
        gdriveIndex={gdriveIndex}
      />
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
        <div className="flex items-center py-2 w-[40%] border-solid border-[1px] border-black border-t-0 pl-2">
          {data?.googleId}
        </div>
        <div className="flex flex-1 items-center  py-2 border-solid border-[1px] border-l-0 border-black border-t-0 pl-2">
          {data?.imdbId}
        </div>
        <div className="flex flex-1 items-center py-2 border-solid border-[1px] border-l-0 border-black border-t-0 pl-2">
          {data?.movieTitle}
        </div>
        <div className="flex flex-1 items-center py-2  border-solid border-[1px] border-l-0 border-black border-t-0 pl-2">
          {data?.season}
        </div>
        <div className="flex flex-1 items-center py-2 border-solid border-[1px] border-l-0 border-black border-t-0 pl-2">
          {data?.episode}
        </div>
        <div className="flex justify-evenly items-center py-2 w-[15%] border-solid border-[1px] border-l-0 border-black border-t-0 pl-2">
          <button
            className="bg-red-100 p-2 rounded"
            onClick={gdriveUpdateModalHandler}
          >
            Edit
          </button>
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

export default GDriveItemTable;
