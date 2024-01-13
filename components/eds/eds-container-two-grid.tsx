import React from "react";
import EdsBannerItem from "./eds-banner-item";
import { Eds } from "@/types/eds";
import { getEdsList } from "@/utils/server-function/eds";

async function EdsContainerTwoGrid() {
  const edsList: Eds[] = await getEdsList("half");

  return (
    <>
      {edsList.length > 0 && (
        <div className={`grid grid-cols-2 gap-4 w-full my-6`}>
          {edsList?.map((eds, edsIndex) => {
            return (
              <EdsBannerItem
                key={edsIndex}
                url={eds.url}
                bannerUrl={eds.bannerUrl}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default EdsContainerTwoGrid;
