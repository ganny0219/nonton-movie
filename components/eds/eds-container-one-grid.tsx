import React from "react";
import EdsBannerItem from "./eds-banner-item";
import { Eds } from "@/types/eds";
import { getEdsList } from "@/utils/server-function/eds";

async function EdsContainerOneGrid() {
  const edsList: Eds[] = await getEdsList("full");

  return (
    <>
      {edsList.length > 0 && (
        <div className={`w-full my-6`}>
          {edsList?.map((eds, edsIndex) => {
            return (
              <div key={edsIndex} className="my-4">
                <EdsBannerItem url={eds.url} bannerUrl={eds.bannerUrl} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default EdsContainerOneGrid;
