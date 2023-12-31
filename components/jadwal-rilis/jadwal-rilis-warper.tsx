"use client";
import React, { useEffect, useState } from "react";
import JadwalRilisContainer from "./jadwal-rilis-container";
import { ReleaseSchedule, ReleaseScheduleData } from "@/types/release-schedule";

type Props = {
  releaseScheduleData: ReleaseScheduleData;
};

function JadwalRilisWarper({ releaseScheduleData }: Props) {
  const [selectedType, setSelectedType] = useState("Series");
  const [releseSchedule, setReleseSchedule] = useState(releaseScheduleData);

  useEffect(() => {
    releseScheduleDataHandler("Series");
  }, []);

  const onSelectedChange = (value: string) => {
    releseScheduleDataHandler(value);
    setSelectedType(value);
  };

  const releseScheduleDataHandler = (value: string) => {
    const keysSchedule = Object.keys(releaseScheduleData);
    const val = value == "Drakor" ? "drama-korea" : value;
    let result: ReleaseScheduleData = {
      monday: [],
      thursday: [],
      wednesday: [],
      tuesday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    for (let key of keysSchedule) {
      for (let data of releaseScheduleData[key]) {
        result = {
          ...result,
          [key]:
            data.movie.type != val.toLowerCase()
              ? [...result[key]]
              : [...result[key], data],
        };
      }
    }
    setReleseSchedule(result);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-evenly mt-6">
        <button
          className={`text-xl  border-secondary ${
            selectedType == "Series" && "text-secondary border-b-2"
          }`}
          onClick={() => onSelectedChange("Series")}
        >
          Series
        </button>
        <button
          className={`text-xl  border-secondary ${
            selectedType == "Anime" && "text-secondary border-b-2"
          }`}
          onClick={() => onSelectedChange("Anime")}
        >
          Anime
        </button>
        <button
          className={`text-xl  border-secondary ${
            selectedType == "Drakor" && "text-secondary border-b-2"
          }`}
          onClick={() => onSelectedChange("Drakor")}
        >
          Drakor
        </button>
      </div>
      <JadwalRilisContainer
        title="Senin"
        releseSchedule={releseSchedule.monday}
      />
      <JadwalRilisContainer
        title="Selasa"
        releseSchedule={releseSchedule.tuesday}
      />
      <JadwalRilisContainer
        title="Rabu"
        releseSchedule={releseSchedule.wednesday}
      />
      <JadwalRilisContainer
        title="Kamis"
        releseSchedule={releseSchedule.thursday}
      />
      <JadwalRilisContainer
        title="Jumat"
        releseSchedule={releseSchedule.friday}
      />
      <JadwalRilisContainer
        title="Sabtu"
        releseSchedule={releseSchedule.saturday}
      />
      <JadwalRilisContainer
        title="Minggu"
        releseSchedule={releseSchedule.sunday}
      />
    </div>
  );
}

export default JadwalRilisWarper;
