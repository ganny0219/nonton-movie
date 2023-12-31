import React from "react";

import Line from "@/components/line";

import RootPanel from "@/components/panel/root-panel";

import { getMovieById } from "@/utils/server-function/movie";

import {
  getPlayerServerListJson,
  getPlayerServerListPanel,
} from "@/utils/server-function/player-server";
import DrakorDetailPanel from "@/components/panel/movie/detail/drakor-detail-panel";
import { PageProps } from "@/types/global";
import { sessionCheck } from "@/utils/server-function/global";

async function UpdateDrakorPage(props: PageProps) {
  const id = props.params.id;
  const movie = await getMovieById(id);
  const playerServerList = await getPlayerServerListPanel();
  const playerServerListJson = await getPlayerServerListJson();
  return (
    <>
      <RootPanel selected="drama-korea">
        <div className="flex flex-col w-[80%] min-h-[100%] max-w-[1100px] m-auto bg-tertiary">
          <div className="flex flex-col justify-center items-center px-4 mt-4 mb-2 pb-6">
            <h1 className="text-3xl mb-2">UPDATE DRAKOR</h1>
            <Line thin />
            <DrakorDetailPanel
              movie={movie}
              playerServerList={playerServerList}
              playerServerListJson={playerServerListJson}
            />
          </div>
        </div>
      </RootPanel>
    </>
  );
}

export default UpdateDrakorPage;
