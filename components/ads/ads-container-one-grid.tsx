import React, { ReactNode, useEffect, useState } from "react";

import AdsBannerItem from "./ads-banner-item";
import { Ads } from "@/types/ads";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { apiAxios } from "@/utils/axios";

function AdsContainerOneGrid() {
  const [adsList, setAdsList] = useState<Ads[]>([]);

  // useEffect(() => {
  //   apiAxios
  //     .get(`/ads/get-full-ads`)
  //     .then((res) => {
  //       const adsData = res.data;
  //       setAdsList(adsData);
  //     });
  // }, []);
  return (
    <>
      {adsList.length > 0 && (
        <div className={`w-full my-6`}>
          {adsList?.map((ads, adsIndex) => {
            return (
              <div key={adsIndex} className="my-4">
                <AdsBannerItem url={ads.url} bannerUrl={ads.bannerUrl} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default AdsContainerOneGrid;
