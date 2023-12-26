"use client";
import DaySheduleContainer from "@/components/panel/schedule/day-shedule-container";

import { Movie } from "@/types/movie";
import { ReleaseScheduleData } from "@/types/release-schedule";

import React, { useState } from "react";

type Props = {
  movie: Movie[];
  releaseScheduleDataDB: ReleaseScheduleData;
};

function SchedulePanel({ movie, releaseScheduleDataDB }: Props) {
  const [releaseScheduleData, setReleaseScheduleData] =
    useState<ReleaseScheduleData>(releaseScheduleDataDB);

  return (
    <>
      <DaySheduleContainer
        title="Monday"
        movie={movie}
        releaseScheduleData={releaseScheduleData.monday}
        setReleaseScheduleData={setReleaseScheduleData}
      />
      <DaySheduleContainer
        title="Tuesday"
        movie={movie}
        releaseScheduleData={releaseScheduleData.tuesday}
        setReleaseScheduleData={setReleaseScheduleData}
      />
      <DaySheduleContainer
        title="Wednesday"
        movie={movie}
        releaseScheduleData={releaseScheduleData.wednesday}
        setReleaseScheduleData={setReleaseScheduleData}
      />
      <DaySheduleContainer
        title="Thursday"
        movie={movie}
        releaseScheduleData={releaseScheduleData.thursday}
        setReleaseScheduleData={setReleaseScheduleData}
      />
      <DaySheduleContainer
        title="Friday"
        movie={movie}
        releaseScheduleData={releaseScheduleData.friday}
        setReleaseScheduleData={setReleaseScheduleData}
      />
      <DaySheduleContainer
        title="Saturday"
        movie={movie}
        releaseScheduleData={releaseScheduleData.saturday}
        setReleaseScheduleData={setReleaseScheduleData}
      />
      <DaySheduleContainer
        title="Sunday"
        movie={movie}
        releaseScheduleData={releaseScheduleData.sunday}
        setReleaseScheduleData={setReleaseScheduleData}
      />
    </>
  );
}

export default SchedulePanel;
