import RootPanel from "@/components/panel/root-panel";

import React from "react";
import { getGoogleDriveListPanel } from "@/utils/server-function/google-drive";
import GDrivePanel from "@/components/panel/google-drive/google-drive-panel";
import { sessionCheck } from "@/utils/server-function/global";

async function GDrivePanelPage() {
  const gdrive = await getGoogleDriveListPanel();
  return (
    <>
      <RootPanel selected="gdrive">
        <GDrivePanel gdrive={gdrive} />
      </RootPanel>
    </>
  );
}

export default GDrivePanelPage;
