import DrawerPanel from "@/components/panel/drawer-panel";
import Script from "next/script";
import React, { ReactNode, useEffect, useState } from "react";
import { useDetectAdBlock } from "adblock-detect-react";
import AdsBlockWarning from "../addblock-warning";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  selected: string;
};

function RootPanel({ children, selected }: Props) {
  // const [adsBlockModal, setAdsBlockModal] = useState(false);
  // const adBlockDetected = useDetectAdBlock();
  // const router = useRouter();

  // useEffect(() => {
  //   if (adBlockDetected) {
  //     setAdsBlockModal(true);
  //   }
  // }, [adBlockDetected]);

  // const adsBlockModalClose = () => {
  //   setAdsBlockModal(false);
  //   router.refresh();
  // };

  return (
    <>
      {/* <AdsBlockWarning visible={adsBlockModal} onClose={adsBlockModalClose} /> */}
      {/* <Script
        src="https://cdn.jsdelivr.net/npm/disable-devtool@latest"
        onReady={() => {
          if (process.env.NODE_ENV === "production") {
            // @ts-ignore
            DisableDevtool({
              ondevtoolopen: () => {
                window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/404`;
              },
            });
          }
        }}
      /> */}
      <div className="flex flex-1 flex-col bg-[#fff]">
        <div className="flex flex-1 flex-row">
          <div className="w-[105px] flex flex-col items-center" />
          <DrawerPanel selected={selected} />
          <div className="w-full flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}

export default RootPanel;
