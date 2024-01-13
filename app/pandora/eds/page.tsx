import EdsPanel from "@/components/panel/eds/eds-panel";
import RootPanel from "@/components/panel/root-panel";

import { getEdsList } from "@/utils/server-function/eds";

import React from "react";

export const dynamic = "force-dynamic";
async function EdsPanelPage() {
  const dataHalfEds = await getEdsList("half");
  const dataFullEds = await getEdsList("full");
  return (
    <RootPanel selected="eds">
      <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
        <h1 className="text-4xl">Eds List</h1>
        {/* <div>
          <input
            className="bg-[#cccccc70] ounded px-2 py-2 rounded"
            placeholder="Search..."
          /> */}
        {/* <button className="bg-tertiary py-2 px-4 rounded mr-4">Upload</button>
          <button className="bg-tertiary py-2 px-4 rounded">Create Eds</button> */}
        {/* </div> */}
      </div>
      <EdsPanel dataFullEds={dataFullEds} dataHalfEds={dataHalfEds} />
    </RootPanel>
  );
}

export default EdsPanelPage;
