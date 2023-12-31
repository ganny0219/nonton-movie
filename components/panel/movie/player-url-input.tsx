import EditButton from "@/components/button/edit-button";
import FieldHorizontal from "@/components/field/field-horizontal";
import { RootState } from "@/store";
import { updateMovieData } from "@/store/movie";
import { Movie, PlayerUrl } from "@/types/movie";
import { PlayerServer, PlayerServerJson } from "@/types/player-server";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GoogleGenerateModal from "./google-generate-episode-modal";
import GoogleGenerateMovieModal from "./google-genereta-movie-modal";
import { apiAxios } from "@/utils/axios";

type Props = {
  updateMode?: boolean;
  playerServerListJson: PlayerServerJson;
  playerUrl: PlayerUrl[];
};

function PlayerUrlInput({ updateMode, playerServerListJson }: Props) {
  const { playerUrl } = useSelector((state: RootState) => state.movie);
  const [editPlayer, setEditPlayer] = useState(updateMode ? true : false);
  const [googleGenerateModal, setGoogleGenerateModal] = useState(false);
  const movieData = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch();

  const googleGenerateModalHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setGoogleGenerateModal((prev) => !prev);
  };

  const inputUrlChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    indexPlayer: number,
    key: string
  ) => {
    const newPlayerUrl = [...playerUrl];
    newPlayerUrl[indexPlayer] = {
      ...newPlayerUrl[indexPlayer],
      [key]: e.target.value,
    };
    dispatch(updateMovieData({ playerUrl: newPlayerUrl }));
  };

  const editPlayerToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editPlayer) {
      await apiAxios.patch(`/player/update-player`, {
        playerList: movieData.playerUrl,
      });
      return setEditPlayer((prev) => !prev);
    }
    return setEditPlayer((prev) => !prev);
  };

  const onSetVidsrc = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (movieData.imdbId == "") {
      return alert("Masukan Imdb Terlebih Dahulu");
    }
    const newPlayerUrl: PlayerUrl[] = [];
    playerUrl.map((player, playerIndex) => {
      if (player.name.toLowerCase().includes("vidsrc")) {
        return newPlayerUrl.push({
          name: player.name,
          url:
            playerServerListJson.vidsrc +
            movieData.type +
            "/" +
            movieData.imdbId,
        });
      } else {
        return newPlayerUrl.push(player);
      }
    });
    dispatch(updateMovieData({ playerUrl: newPlayerUrl }));
  };

  return (
    <>
      <GoogleGenerateMovieModal
        movieTitle={movieData.title}
        imdbId={movieData.imdbId}
        update={updateMode}
        visible={googleGenerateModal}
        onClose={googleGenerateModalHandler}
        movieType={movieData.type}
      />
      <div className="bg-[#ffffff80] flex flex-col px-2 mt-6 rounded">
        <div className="flex flex-row items-center my-4">
          <h3 className=" whitespace-nowrap text-xl mr-2 w-[20%]">
            Player Url
          </h3>
          <button
            className={`mr-2 py-1 whitespace-nowrap bg-[#fff] px-2 rounded`}
            onClick={googleGenerateModalHandler}
          >
            Generate Google
          </button>
          <button
            disabled={editPlayer}
            className={`mr-4 py-1 whitespace-nowrap ${
              editPlayer ? " bg-[#ffffff50]" : "bg-[#fff]"
            } px-2 rounded`}
            onClick={onSetVidsrc}
          >
            Set Vidsrc
          </button>
          {updateMode && (
            <EditButton
              title="Player"
              toggleHandler={editPlayerToggle}
              edit={editPlayer}
            />
          )}
        </div>
        {playerUrl?.map((player, indexPlayer) => {
          return (
            <div key={indexPlayer} className="flex flex-row items-center">
              <FieldHorizontal
                unedit
                disabled={editPlayer}
                name="Name"
                value={player.name}
                conf={{
                  onChange: (e) =>
                    inputUrlChangeHandler(e, indexPlayer, "name"),
                }}
              />
              <FieldHorizontal
                disabled={editPlayer}
                name="Url"
                value={player.url}
                conf={{
                  onChange: (e) => inputUrlChangeHandler(e, indexPlayer, "url"),
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PlayerUrlInput;
