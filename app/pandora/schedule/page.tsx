import Line from "@/components/line";
import RootPanel from "@/components/panel/root-panel";
import SchedulePanel from "@/components/panel/schedule/schedule-panel";

import { sessionCheck } from "@/utils/server-function/global";
import { getMovieListPanel } from "@/utils/server-function/movie";
import { getReleaseSchedule } from "@/utils/server-function/release-schedule";

import React from "react";

//export const dynamic = "force-dynamic";

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
