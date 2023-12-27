import Line from "@/components/line";
import React, { useState } from "react";

import { PlayerServer } from "@/types/player-server";
import RootPanel from "@/components/panel/root-panel";
import FieldHorizontal from "@/components/field/field-horizontal";

import PlayerServerItem from "@/components/panel/config/player-server/player-server-item";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { apiAxios } from "@/utils/axios";
import Loading from "@/components/loading";
import { getPlayerServerListPanel } from "@/utils/server-function/player-server";
import PlayerServerPanel from "@/components/panel/config/player-server/player-server-panel";
import { sessionCheck } from "@/utils/server-function/global";

async function PlayerServerPage() {
  const playerServerList = await getPlayerServerListPanel();
  return (
    <>
      <RootPanel selected="config">
        <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
          <h1 className="text-4xl">Player Server List</h1>
        </div>
        <Line thin color="#00000050" />
        <PlayerServerPanel playerServerList={playerServerList} />
      </RootPanel>
    </>
  );
}

export default PlayerServerPage;
