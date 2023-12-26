"use client";
import Line from "@/components/line";
import React, { useState } from "react";

import { PlayerServer } from "@/types/player-server";
import FieldHorizontal from "@/components/field/field-horizontal";

import PlayerServerItem from "@/components/panel/config/player-server/player-server-item";
import { apiAxios } from "@/utils/axios";
import Loading from "@/components/loading";

type Props = {
  playerServerList: PlayerServer[];
};

function PlayerServerPanel({ playerServerList }: Props) {
  const [inputPlayerData, setInputPlayerData] = useState({
    name: "",
    baseUrl: "",
  });
  const [playerServerData, setPlayerServerData] =
    useState<PlayerServer[]>(playerServerList);
  const [loading, setLoading] = useState(false);

  const inputPlayerDataValidation =
    inputPlayerData.name != "" && inputPlayerData.baseUrl != "";

  // const editHandler = async () => {
  //   if (edit == false) {
  //     await axios
  //       .post(
  //         `/player-server/upsert`,
  //         {
  //           playerServer: playerServerData,
  //         },
  //
  //       )
  //       .then((res) => res.data);
  //     setEdit(true);
  //   } else {
  //     setEdit(false);
  //   }
  // };

  const onInputPlayerDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setInputPlayerData((prevData) => {
      return {
        ...prevData,
        [key]: e.target.value,
      };
    });
  };

  const onTambahPlayer = async () => {
    setLoading(true);
    const result = await apiAxios
      .post(`/player-server/insert`, {
        playerServer: inputPlayerData,
      })
      .then((res) => res.data)
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    setLoading(false);
    setPlayerServerData((prevPlayer) => {
      return prevPlayer.length > 0 ? [...prevPlayer, result] : [result];
    });
    setInputPlayerData({
      name: "",
      baseUrl: "",
    });
  };

  return (
    <>
      <Loading visible={loading} />

      <div className="flex flex-col p-2 w-[80%] px-4 my-6 max-w-[1100px] m-auto bg-tertiary rounded-md">
        <div className="flex justify-between items-center">
          <h3 className="text-4xl">Player</h3>
        </div>
        <div className="flex flex-row items-center">
          <FieldHorizontal
            name="ServerName"
            value={inputPlayerData.name}
            conf={{
              onChange(e) {
                onInputPlayerDataChange(e, "name");
              },
            }}
          />
          <FieldHorizontal
            name="BaseUrl"
            value={inputPlayerData.baseUrl}
            conf={{
              onChange(e) {
                onInputPlayerDataChange(e, "baseUrl");
              },
            }}
          />
          <button
            disabled={!inputPlayerDataValidation}
            className={`w-[10%] ${
              !inputPlayerDataValidation ? "bg-[#ffffff50]" : "bg-[#fff]"
            } rounded py-1`}
            onClick={onTambahPlayer}
          >
            Add
          </button>
        </div>
        <Line thin color="#313131" />
        <div className="flex flex-row items-center">
          <div className="flex flex-col w-[100%]">
            {playerServerData?.map((playServer, playServerIndex) => {
              return (
                <PlayerServerItem
                  playServer={playServer}
                  playerServerIndex={playServerIndex}
                  setPlayerServerData={setPlayerServerData}
                  key={playServerIndex}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerServerPanel;
