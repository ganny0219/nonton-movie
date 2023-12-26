import Field from "@/components/field/field";
import FieldHorizontal from "@/components/field/field-horizontal";
import Line from "@/components/line";
import AdsItem from "@/components/panel/ads/ads-item";
import RootPanel from "@/components/panel/root-panel";
import DaySheduleContainer from "@/components/panel/schedule/day-shedule-container";
import SchedulePanel from "@/components/panel/schedule/schedule-panel";
import { Ads } from "@/types/ads";
import { Movie } from "@/types/movie";
import { ReleaseScheduleData } from "@/types/release-schedule";
import { apiAxios } from "@/utils/axios";
import { getMovieListPanel } from "@/utils/server-function/movie";
import { getReleaseSchedule } from "@/utils/server-function/release-schedule";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";

async function SchedulePanelPage() {
  const movie = await getMovieListPanel("");
  const releaseScheduleDataDB = await getReleaseSchedule();

  return (
    <RootPanel selected="schedule">
      <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
        <h1 className="text-4xl">Schedule List</h1>
      </div>
      <Line thin color="#00000050" />
      <SchedulePanel
        movie={movie}
        releaseScheduleDataDB={releaseScheduleDataDB}
      />
    </RootPanel>
  );
}

export default SchedulePanelPage;
