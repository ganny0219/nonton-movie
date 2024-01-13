"use client";
import FieldHorizontal from "@/components/field/field-horizontal";
import Line from "@/components/line";
import { Eds } from "@/types/eds";
import { apiAxios } from "@/utils/axios";
import React, { useState } from "react";
import EdsItem from "./eds-item";
type Props = {
  dataHalfEds: Eds[];
  dataFullEds: Eds[];
};

function EdsPanel({ dataFullEds, dataHalfEds }: Props) {
  const [fullEds, setFullEds] = useState<Eds[]>(dataFullEds);
  const [halfEds, setHalfEds] = useState<Eds[]>(dataHalfEds);
  const [tambahFullEds, setTambahFullEds] = useState<Eds>({
    name: "",
    sequence: 0,
    type: "full",
    url: "",
    bannerUrl: "",
  });
  const [tambahHalfEds, setTambahHalfEds] = useState<Eds>({
    name: "",
    sequence: 0,
    type: "half",
    url: "",
    bannerUrl: "",
  });
  const tambahFullValidation =
    tambahFullEds.name != "" &&
    tambahFullEds.url != "" &&
    tambahFullEds.bannerUrl != "";
  const tambahHalfValidation =
    tambahHalfEds.name != "" &&
    tambahHalfEds.url != "" &&
    tambahHalfEds.bannerUrl != "";
  const onInputTambahChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    key: string
  ) => {
    if (type == "full") {
      setTambahFullEds((prev) => {
        return {
          ...prev,
          [key]: e.target.value,
        };
      });
    } else {
      setTambahHalfEds((prev) => {
        return {
          ...prev,
          [key]: e.target.value,
        };
      });
    }
  };

  const onTambahEds = async (type: string) => {
    if (type == "full") {
      await apiAxios
        .post(`/eds/create`, {
          dataEds: tambahFullEds,
        })
        .then((res) => {
          setFullEds((prevEds) => {
            if (prevEds.length > 0) {
              return [...prevEds, res.data];
            }
            return [res.data];
          });
          return setTambahFullEds({
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
        .post(`/eds/create`, {
          dataEds: tambahHalfEds,
        })
        .then((res) => {
          setHalfEds((prevEds) => {
            if (prevEds.length > 0) {
              return [...prevEds, res.data];
            }
            return [res.data];
          });
          return setTambahHalfEds({
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
    <>
      <Line thin color="#00000050" />
      <div className="flex flex-col p-2 w-[80%] max-w-[1100px] m-auto bg-tertiary rounded-md">
        <h2 className="text-4xl p-2">Full Eds</h2>
        <div className="flex flex-row items-center">
          <FieldHorizontal
            name="Name"
            value={tambahFullEds.name}
            conf={{ onChange: (e) => onInputTambahChange(e, "full", "name") }}
            // conf={{ onChange: (e) => onInputTambahChange(e, "full", "name") }}
          />
          <FieldHorizontal
            name="Url"
            value={tambahFullEds.url}
            conf={{ onChange: (e) => onInputTambahChange(e, "full", "url") }}
          />
          <FieldHorizontal
            name="Banner Url"
            value={tambahFullEds.bannerUrl}
            conf={{
              onChange: (e) => onInputTambahChange(e, "full", "bannerUrl"),
            }}
          />
          <button
            disabled={!tambahFullValidation}
            className={`ml-2 rounded ${
              tambahFullValidation ? "bg-[#fff]" : "bg-[#ffffff90]"
            } p-1`}
            onClick={() => onTambahEds("full")}
          >
            Tambah
          </button>
        </div>
        <Line thin />
        {fullEds?.length > 0 ? (
          fullEds.map((eds, edsIndex) => {
            return (
              <EdsItem
                key={edsIndex}
                eds={eds}
                edsIndex={edsIndex}
                setFullEds={setFullEds}
                setHalfEds={setHalfEds}
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
        <h2 className="text-4xl p-2">Half Eds</h2>
        <div className="flex flex-row items-center">
          <FieldHorizontal
            name="Name"
            value={tambahHalfEds.name}
            conf={{ onChange: (e) => onInputTambahChange(e, "half", "name") }}
          />
          <FieldHorizontal
            name="Url"
            value={tambahHalfEds.url}
            conf={{ onChange: (e) => onInputTambahChange(e, "half", "url") }}
          />
          <FieldHorizontal
            name="Banner Url"
            value={tambahHalfEds.bannerUrl}
            conf={{
              onChange: (e) => onInputTambahChange(e, "half", "bannerUrl"),
            }}
          />
          <button
            disabled={!tambahHalfValidation}
            className={`ml-2 rounded ${
              tambahHalfValidation ? "bg-[#fff]" : "bg-[#ffffff90]"
            } p-1`}
            onClick={() => onTambahEds("half")}
          >
            Tambah
          </button>
        </div>
        <Line thin />
        {halfEds?.length > 0 ? (
          halfEds.map((eds, edsIndex) => {
            return (
              <EdsItem
                key={edsIndex}
                eds={eds}
                edsIndex={edsIndex}
                setFullEds={setFullEds}
                setHalfEds={setHalfEds}
              />
            );
          })
        ) : (
          <div className="flex flex-1 justify-center items-center text-2xl">
            No Data
          </div>
        )}
      </div>
    </>
  );
}

export default EdsPanel;
