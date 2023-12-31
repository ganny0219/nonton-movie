import { PlayerUrl } from "@/types/movie";
import React from "react";

type Props = {
  playerList: PlayerUrl[];
  player: PlayerUrl | null;
  selectedHandler: (player: PlayerUrl) => void;
};

function PlayerList({ selectedHandler, playerList, player }: Props) {
  return (
    <>
      {playerList?.length > 0 && (
        <p className="sm:text-2xl mb-2">Server List</p>
      )}
      <div className="flex-warp w-full">
        {playerList?.map((play, index) => {
          if (play.url.length > 25) {
            return (
              <button
                key={index}
                className={`${
                  play.name == player?.name
                    ? "bg-secondary text-[#313131]"
                    : "bg-[#fff] text-[#313131]"
                } rounded py-1 px-4 mr-4 my-1 text-xs sm:text-base`}
                onClick={() => selectedHandler(play)}
              >
                {play.name}
              </button>
            );
          }
        })}
      </div>
    </>
  );
}

export default PlayerList;
