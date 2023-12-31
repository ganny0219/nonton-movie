import EditButton from "@/components/button/edit-button";
import FieldHorizontal from "@/components/field/field-horizontal";
import { RootState } from "@/store";
import { updateEpisodeData } from "@/store/movie";
import { PlayerUrl } from "@/types/movie";
import { apiAxios } from "@/utils/axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  editEpisode?: boolean;
  episodeIndex: number;
  seasonIndex: number;
  updateMode?: boolean;
};

function PlayerEpisodeUrlInput({
  editEpisode,
  seasonIndex,
  episodeIndex,
  updateMode,
}: Props) {
  const movieData = useSelector((state: RootState) => state.movie);
  const playerUrl =
    movieData.season[seasonIndex].episode[episodeIndex].playerUrl;
  const [editPlayer, setEditPlayer] = useState(updateMode ? true : false);
  const dispatch = useDispatch();
  const inputUrlChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    playerIndex: number,
    key: string
  ) => {
    const newPlayerUrl = [...playerUrl];
    newPlayerUrl[playerIndex] = {
      ...newPlayerUrl[playerIndex],
      [key]: e.target.value,
    };

    dispatch(
      updateEpisodeData({
        episodeIndex,
        key: "playerUrl",
        seasonIndex,
        value: newPlayerUrl,
      })
    );
  };

  const editPlayerToggel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editPlayer) {
      await apiAxios.patch(`/player/update-episode-player`, {
        playerList: playerUrl,
      });
      return setEditPlayer((prev) => !prev);
    }
    return setEditPlayer((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center my-2 px-2">
        <h3 className="mr-2 w-[20%]">Player Url</h3>
        {updateMode && !editEpisode && (
          <EditButton
            toggleHandler={editPlayerToggel}
            title="Player"
            edit={editPlayer}
          />
        )}
      </div>
      <div className="w-full">
        {playerUrl?.map((player, playerIndex) => {
          return (
            <div key={playerIndex} className="flex flex-row items-center mx-2">
              <FieldHorizontal
                unedit
                disabled={editEpisode || editPlayer}
                value={player.name}
                conf={{
                  onChange: (e) =>
                    inputUrlChangeHandler(e, playerIndex, "name"),
                }}
                name="Name"
              />
              <FieldHorizontal
                disabled={editEpisode || editPlayer}
                value={player.url}
                conf={{
                  onChange: (e) => inputUrlChangeHandler(e, playerIndex, "url"),
                }}
                name="Url"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlayerEpisodeUrlInput;
