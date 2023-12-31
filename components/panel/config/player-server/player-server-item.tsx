import DeleteConfirm from "@/components/delete-confirm";
import FieldHorizontal from "@/components/field/field-horizontal";
import Loading from "@/components/loading";
import { PlayerServer } from "@/types/player-server";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  playServer: PlayerServer;
  setPlayerServerData: React.Dispatch<React.SetStateAction<PlayerServer[]>>;
  playerServerIndex: number;
};

function PlayerServerItem({
  playServer,
  setPlayerServerData,
  playerServerIndex,
}: Props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPalyerServerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setPlayerServerData((prevData) => {
      let newPlayerServer = [...prevData];
      newPlayerServer[playerServerIndex] = {
        ...newPlayerServer[playerServerIndex],
        [key]: e.target.value,
      };
      return newPlayerServer;
    });
  };

  const deleteModalHandler = () => {
    setDeleteModal((prev) => !prev);
  };

  const onDelete = async () => {
    setLoading(true);
    await apiAxios
      .get(`/player-server/delete`, {
        params: {
          playerServerId: playServer.id,
          playerServerName: playServer.name,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    setLoading(false);
    setPlayerServerData((prevPlayer) => {
      const newPlayerServer = [...prevPlayer];
      newPlayerServer.splice(playerServerIndex, 1);
      return newPlayerServer;
    });
    setDeleteModal(false);
    setEdit(false);
  };

  const editToggle = async () => {
    setLoading(true);

    if (edit) {
      await apiAxios
        .patch(`/player-server/update`, {
          playerServer: playServer,
        })
        .then((res) => {
          setLoading(false);
          res.data;
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
      return setEdit((prev) => !prev);
    }
    setEdit((prev) => !prev);
  };
  return (
    <>
      <Loading visible={loading} />
      <DeleteConfirm
        onConfirm={onDelete}
        visible={deleteModal}
        onClose={deleteModalHandler}
      />
      <div className="flex flex-row items-center">
        <FieldHorizontal
          disabled={!edit}
          name="ServerName"
          value={playServer.name}
          conf={{
            onChange(e) {
              onPalyerServerChange(e, "name");
            },
          }}
        />
        <FieldHorizontal
          disabled={!edit}
          name="BaseUrl"
          value={playServer.baseUrl}
          conf={{
            onChange(e) {
              onPalyerServerChange(e, "baseUrl");
            },
          }}
        />
        {edit && (
          <button
            className="bg-red-500 rounded w-[10%] py-1"
            onClick={deleteModalHandler}
          >
            X
          </button>
        )}
        <button
          onClick={editToggle}
          className="ml-6 mr-2 bg-[#fff] py-1 px-2 rounded"
        >
          {!edit ? "Edit" : "Save"}
        </button>
      </div>
    </>
  );
}

export default PlayerServerItem;
