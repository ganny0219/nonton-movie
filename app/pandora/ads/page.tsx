"use client";
import Field from "@/components/field/field";
import FieldHorizontal from "@/components/field/field-horizontal";
import Line from "@/components/line";
import AdsItem from "@/components/panel/ads/ads-item";
import AdsPanel from "@/components/panel/ads/ads-panel";
import RootPanel from "@/components/panel/root-panel";
import { Ads } from "@/types/ads";
import { apiAxios } from "@/utils/axios";
import { getAdsList, getAdsListPanel } from "@/utils/server-function/ads";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";

async function AdsPanelPage() {
  const dataHalfAds = await getAdsList("half");
  const dataFullAds = await getAdsList("full");
  return (
    <RootPanel selected="ads">
      <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
        <h1 className="text-4xl">Ads List</h1>
        {/* <div>
          <input
            className="bg-[#cccccc70] ounded px-2 py-2 rounded"
            placeholder="Search..."
          /> */}
        {/* <button className="bg-tertiary py-2 px-4 rounded mr-4">Upload</button>
          <button className="bg-tertiary py-2 px-4 rounded">Create Ads</button> */}
        {/* </div> */}
      </div>
      <AdsPanel dataFullAds={dataFullAds} dataHalfAds={dataHalfAds} />
    </RootPanel>
  );
}

export default AdsPanelPage;
