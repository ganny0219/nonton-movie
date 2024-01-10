import Line from "@/components/line";
import RootPanel from "@/components/panel/root-panel";
import SocialMediaPanel from "@/components/panel/social-media/social-media-panel";
import { getSocialMedia } from "@/utils/server-function/social-media";
import React from "react";

//export const dynamic = "force-dynamic";

async function SocialMediaPanelPage() {
  const socialMediaData = await getSocialMedia();
  return (
    <RootPanel selected="social-media">
      <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
        <h1 className="text-4xl">Social Media List</h1>
      </div>
      <Line thin color="#00000050" />
      <SocialMediaPanel socialMediaData={socialMediaData} />
    </RootPanel>
  );
}

export default SocialMediaPanelPage;
