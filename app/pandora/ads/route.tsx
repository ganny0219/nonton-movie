import Field from "@/components/field/field";
import FieldHorizontal from "@/components/field/field-horizontal";
import Line from "@/components/line";
import AdsItem from "@/components/panel/ads/ads-item";
import RootPanel from "@/components/panel/root-panel";
import { Ads } from "@/types/ads";
import { apiAxios } from "@/utils/axios";
import { getAdsListPanel } from "@/utils/server-function/ads";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {
  dataHalfAds: Ads[];
  dataFullAds: Ads[];
};

function AdsPanelPage({ dataFullAds, dataHalfAds }: Props) {
  const [fullAds, setFullAds] = useState<Ads[]>(dataFullAds);
  const [halfAds, setHalfAds] = useState<Ads[]>(dataHalfAds);
  const [tambahFullAds, setTambahFullAds] = useState<Ads>({
    name: "",
    sequence: 0,
    type: "full",
    url: "",
    bannerUrl: "",
  });
  const [tambahHalfAds, setTambahHalfAds] = useState<Ads>({
    name: "",
    sequence: 0,
    type: "half",
    url: "",
    bannerUrl: "",
  });
  const tambahFullValidation =
    tambahFullAds.name != "" && tambahFullAds.url != "";
  const tambahHalfValidation =
    tambahHalfAds.name != "" && tambahHalfAds.url != "";

  const onInputTambahChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    key: string
  ) => {
    if (type == "full") {
      return setTambahFullAds((prev) => {
        return {
          ...prev,
          [key]: e.target.value,
        };
      });
    } else {
      return setTambahHalfAds((prev) => {
        return {
          ...prev,
          [key]: e.target.value,
        };
      });
    }
  };

  const onTambahAds = async (type: string) => {
    if (type == "full") {
      await apiAxios
        .post(`/ads/create`, {
          dataAds: tambahFullAds,
        })
        .then((res) => {
          setFullAds((prevAds) => {
            if (prevAds.length > 0) {
              return [...prevAds, res.data];
            }
            return [res.data];
          });
          return setTambahFullAds({
            name: "",
            sequence: 0,
            type: "full",
            url: "",
            bannerUrl: "",
          });
        })
        .catch((err) => console.log(err));
    } else {
      await apiAxios
        .post(`/ads/create`, {
          dataAds: tambahHalfAds,
        })
        .then((res) => {
          setHalfAds((prevAds) => {
            if (prevAds.length > 0) {
              return [...prevAds, res.data];
            }
            return [res.data];
          });
          return setTambahHalfAds({
            name: "",
            sequence: 0,
            type: "half",
            url: "",
            bannerUrl: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };
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
      <Line thin color="#00000050" />
      <div className="flex flex-col p-2 w-[80%] max-w-[1100px] m-auto bg-tertiary rounded-md">
        <h2 className="text-4xl p-2">Full Ads</h2>
        <div className="flex flex-row items-center">
          <FieldHorizontal
            name="Name"
            value={tambahFullAds.name}
            conf={{ onChange: (e) => onInputTambahChange(e, "full", "name") }}
          />
          <FieldHorizontal
            name="Url"
            value={tambahFullAds.url}
            conf={{ onChange: (e) => onInputTambahChange(e, "full", "url") }}
          />
          <FieldHorizontal
            name="Banner Url"
            value={tambahFullAds.bannerUrl}
            conf={{
              onChange: (e) => onInputTambahChange(e, "full", "bannerUrl"),
            }}
          />
          <button
            disabled={!tambahFullValidation}
            className={`ml-2 rounded ${tambahFullValidation ? "bg-[#fff]" : "bg-[#ffffff90]"
              } p-1`}
            onClick={() => onTambahAds("full")}
          >
            Tambah
          </button>
        </div>
        <Line thin />
        {fullAds?.length > 0 ? (
          fullAds.map((ads, adsIndex) => {
            return (
              <AdsItem
                key={adsIndex}
                ads={ads}
                adsIndex={adsIndex}
                setFullAds={setFullAds}
                setHalfAds={setHalfAds}
              />
            );
          })
        ) : (
          <div className="flex flex-1 justify-center items-center text-2xl">
            No Data
          </div>
        )}
      </div>
      <div className="flex flex-col p-2 w-[80%] max-w-[1100px] m-auto bg-tertiary mt-6 rounded-md">
        <h2 className="text-4xl p-2">Half Ads</h2>
        <div className="flex flex-row items-center">
          <FieldHorizontal
            name="Name"
            value={tambahHalfAds.name}
            conf={{ onChange: (e) => onInputTambahChange(e, "half", "name") }}
          />
          <FieldHorizontal
            name="Url"
            value={tambahHalfAds.url}
            conf={{ onChange: (e) => onInputTambahChange(e, "half", "url") }}
          />
          <FieldHorizontal
            name="Banner Url"
            value={tambahHalfAds.bannerUrl}
            conf={{
              onChange: (e) => onInputTambahChange(e, "half", "bannerUrl"),
            }}
          />
          <button
            disabled={!tambahHalfValidation}
            className={`ml-2 rounded ${tambahHalfValidation ? "bg-[#fff]" : "bg-[#ffffff90]"
              } p-1`}
            onClick={() => onTambahAds("half")}
          >
            Tambah
          </button>
        </div>
        <Line thin />
        {halfAds?.length > 0 ? (
          halfAds.map((ads, adsIndex) => {
            return (
              <AdsItem
                key={adsIndex}
                ads={ads}
                adsIndex={adsIndex}
                setFullAds={setFullAds}
                setHalfAds={setHalfAds}
              />
            );
          })
        ) : (
          <div className="flex flex-1 justify-center items-center text-2xl">
            No Data
          </div>
        )}
      </div>
    </RootPanel>
  );
}

export default AdsPanelPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/pandora/auth",
      },
    };
  }
  const dataAds = await getAdsListPanel();

  const dataFullAds = [];
  const dataHalfAds = [];

  for (let ads of dataAds) {
    if (ads.type == "full") {
      dataFullAds.push(ads);
    } else {
      dataHalfAds.push(ads);
    }
  }
  return {
    props: {
      dataFullAds,
      dataHalfAds,
    },
  };
};
