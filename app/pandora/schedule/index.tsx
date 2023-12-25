import Field from "@/components/field/field";
import FieldHorizontal from "@/components/field/field-horizontal";
import Line from "@/components/line";
import AdsItem from "@/components/panel/ads/ads-item";
import RootPanel from "@/components/panel/root-panel";
import DaySheduleContainer from "@/components/panel/schedule/day-shedule-container";
import movie from "@/pages/api/rss/movie";
import { Ads } from "@/types/ads";
import { Movie } from "@/types/movie";
import { ReleaseScheduleData } from "@/types/release-schedule";
import { apiAxios } from "@/utils/axios";
import { getMovieListPanel } from "@/utils/server-function/movie";
import { getReleaseSchedule } from "@/utils/server-function/release-schedule";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React, { useState } from "react";

type Props = {
  movie: Movie[];
  releaseScheduleDataDB: ReleaseScheduleData;
};

function SchedulePanelPage({ movie, releaseScheduleDataDB }: Props) {
  const [releaseScheduleData, setReleaseScheduleData] =
    useState<ReleaseScheduleData>(releaseScheduleDataDB);

  return (
    <RootPanel selected="schedule">
      <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
        <h1 className="text-4xl">Schedule List</h1>
      </div>
      <Line thin color="#00000050" />
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
    </RootPanel>
  );
}

export default SchedulePanelPage;

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

  const movie = await getMovieListPanel("");
  const releaseScheduleDataDB = await getReleaseSchedule();

  return {
    props: {
      movie: movie,
      releaseScheduleDataDB: releaseScheduleDataDB,
    },
  };
};
