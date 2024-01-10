import Line from "@/components/line";
import RootPanel from "@/components/panel/root-panel";
import { sessionCheck } from "@/utils/server-function/global";
import Link from "next/link";
import React from "react";

//export const dynamic = "force-dynamic";
async function ConfigPage() {
  return (
    <RootPanel selected="config">
      <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
        <h1 className="text-4xl">Config List</h1>
      </div>
      <Line thin color="#00000050" />
      <div className="flex flex-col p-2 w-[80%] max-w-[1100px] m-auto bg-tertiary rounded-md">
        <div className="flex flex-col items-center justify-center">
          <Link
            href={{ pathname: "/pandora/config/imdb-selector" }}
            className="bg-[#fff] my-2 rounded py-2 px-10 shadow-lg"
          >
            SELECTOR
          </Link>
          <Link
            href={{ pathname: "/pandora/config/player-server" }}
            className="bg-[#fff] my-2 rounded py-2 px-10 shadow-lg"
          >
            PLAYER SERVER
          </Link>
        </div>
      </div>
    </RootPanel>
  );
}

export default ConfigPage;
