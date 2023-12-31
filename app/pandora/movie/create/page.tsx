import React from "react";

import Line from "@/components/line";

import RootPanel from "@/components/panel/root-panel";

import {
  getPlayerServerListJson,
  getPlayerServerListPanel,
} from "@/utils/server-function/player-server";
import CreateMoviePanel from "@/components/panel/movie/create/create-movie-panel";
import { sessionCheck } from "@/utils/server-function/global";

async function CreateMoviePage() {
  const playerServerList = await getPlayerServerListPanel();
  const playerServerListJson = await getPlayerServerListJson();
  return (
    <>
      <RootPanel selected="movie">
        <div className="flex flex-col w-[80%] min-h-[100%] max-w-[1100px] m-auto bg-tertiary">
          <div className="flex flex-col justify-center items-center px-4 mt-4 mb-2 pb-6">
            <h1 className="text-3xl mb-2">CREATE MOVIE</h1>
            <Line thin />
            <CreateMoviePanel
              playerServerList={playerServerList}
              playerServerListJson={playerServerListJson}
            />
          </div>
        </div>
      </RootPanel>
    </>
  );
}

export default CreateMoviePage;
