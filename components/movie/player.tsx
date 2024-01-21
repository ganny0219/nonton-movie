"use client";
import React, { useEffect, useState } from "react";
import PlayerList from "../button/player-list";
import { Movie, PlayerUrl, Track } from "@/types/movie";

type Props = {
  playerUrl: PlayerUrl[];
  track: Track[];
};

function Player({ playerUrl, track }: Props) {
  const [player, setPlayer] = useState<PlayerUrl | null>(playerUrl[0]);
  const [playerCover, setPlayerCover] = useState(true);
  // const [trackUrl, setTrackUrl] = useState("");

  const vidSrcTrack = `${
    track.length > 0
      ? `?sub.file=${track[0].url}&sub.label=${track[0].language}`
      : ""
  }`;

  // useEffect(() => {
  //   let playUrl = playerUrl.find((player) => player.url.length > 25);
  //   if (
  //     playUrl?.name.toLowerCase().includes("playerx") &&
  //     playUrl?.url[playUrl.url.length] != "/"
  //   ) {
  //     playUrl.url = playUrl?.url + "/";
  //   }
  //   setPlayer(playUrl ? playUrl : null);
  //   setPlayerCover(true);
  // }, [playerUrl]);

  const playerHandler = (player: PlayerUrl) => {
    let playerUrl = "";
    // if (
    //   player.name.toLowerCase().includes("playerx") &&
    //   player.url[player.url.length] != "/"
    // ) {
    //   playerUrl = player.url + "/";
    // } else {
    //   playerUrl = player.url;
    // }
    setPlayer(player);
    // setPlayer({
    //   ...player,
    //   url: playerUrl,
    // });
  };

  const playerCoverHandler = () => {
    setPlayerCover(false);
  };

  return (
    <>
      {player?.url != "" && player?.url != undefined ? (
        // <div className="relative w-full aspect-video overflow-hidden">
        <>
          <iframe
            className="w-full aspect-video"
            src={`${player?.url}${player?.name == "Vidsrc" ? vidSrcTrack : ""}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          {/* {playerCover && (
                <Image loading="lazy"
                  alt=""
                  height={800}
                  width={800}
                  src={`/img/screen-cover.png`}
                  className="absolute z-96 top-0 left-0 w-full h-full bg-[#313131] hover:cursor-pointer hover:scale-105 active:opacity-70"
                  onClick={playerCoverHandler}
                  />
                )} */}
        </>
      ) : (
        // </div>
        <div className="w-full aspect-video flex justify-center items-center bg-[#ffffff50] text-2xl">
          Player Error
        </div>
      )}
      <div className="w-full border-t-2 border-dashed border-[#000] my-4" />
      <PlayerList
        playerList={playerUrl}
        player={player}
        selectedHandler={playerHandler}
      />
      <div className="w-full border-t-2 border-dashed border-[#000] my-4" />
    </>
  );
}

export default Player;
