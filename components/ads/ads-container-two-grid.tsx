"use client";
import React, { ReactNode, useEffect, useState } from "react";
import AdsBannerItem from "./ads-banner-item";
import { Ads } from "@/types/ads";
import axios from "axios";
import { apiAxios } from "@/utils/axios";

function AdsContainerTwoGrid() {
  const [adsList, setAdsList] = useState<Ads[]>([]);
  // useEffect(() => {
  //   apiAxios
  //     .get(`/ads/get-half-ads`)
  //     .then((res) => {
  //       const adsData = res.data;
  //       setAdsList(adsData);
  //     });
  // }, []);
  return (
    <>
      {adsList.length > 0 && (
        <div className={`grid grid-cols-2 gap-4 w-full my-6`}>
          {adsList?.map((ads, adsIndex) => {
            return (
              <AdsBannerItem
                key={adsIndex}
                url={ads.url}
                bannerUrl={ads.bannerUrl}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default AdsContainerTwoGrid;
