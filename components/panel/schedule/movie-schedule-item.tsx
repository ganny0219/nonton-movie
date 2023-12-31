import DeleteConfirm from "@/components/delete-confirm";
import FieldHorizontal from "@/components/field/field-horizontal";
import { Ads } from "@/types/ads";
import { Movie } from "@/types/movie";
import { ReleaseSchedule, ReleaseScheduleData } from "@/types/release-schedule";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  releaseSchedule: ReleaseSchedule;
  releaseScheduleIndex: number;
  setReleaseScheduleData: React.Dispatch<
    React.SetStateAction<ReleaseScheduleData>
  >;
};

function MovieScheduleItem({
  releaseScheduleIndex,
  releaseSchedule,
  setReleaseScheduleData,
}: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const onDeleteConfirmClose = () => {
    setDeleteConfirm(false);
  };

  const onDeleteAds = async () => {
    await apiAxios.delete(`/release-schedule/delete`, {
      params: {
        releaseScheduleId: releaseSchedule.id,
      },
    });

    onDeleteConfirmClose();
    setReleaseScheduleData((prev) => {
      const newReleaseSchedule = [...prev[releaseSchedule.day]];
      newReleaseSchedule.splice(releaseScheduleIndex, 1);
      const result = {
        ...prev,
        [releaseSchedule.day]: newReleaseSchedule,
      };
      return result;
    });
  };

  return (
    <>
      <DeleteConfirm
        visible={deleteConfirm}
        onClose={onDeleteConfirmClose}
        onConfirm={onDeleteAds}
      />
      <div className="flex flex-row items-center">
        <FieldHorizontal
          disabled
          name="Title"
          value={releaseSchedule?.movie?.title}
        />
        <FieldHorizontal
          disabled
          name="Imdb"
          value={releaseSchedule?.movie?.imdbId}
        />
        <button
          className="bg-red-500 w-[7%] min-w-[30px] aspect-square rounded-md"
          onClick={() => setDeleteConfirm(true)}
        >
          X
        </button>
      </div>
    </>
  );
}

export default MovieScheduleItem;
