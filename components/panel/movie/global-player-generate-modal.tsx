import FieldHorizontal from "@/components/field/field-horizontal";
import { Episode, EpisodePlayerList, Season } from "@/types/movie";
import { PlayerServer } from "@/types/player-server";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  visible: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onGeneratePlayer: (
    e: React.MouseEvent<HTMLButtonElement>,
    episodeList: EpisodePlayerList
  ) => {};
  seasonData: Season;
  imdbId: string;
  playerServer: PlayerServer[];
};

const GeneratePlayerGenerateModal = ({
  visible,
  onClose,
  onGeneratePlayer,
  seasonData,
  imdbId,
  playerServer,
}: Props) => {
  const [episodeList, setEpisodeList] = useState<EpisodePlayerList>({});
  const [selectedServer, setSelectedServer] = useState("");
  useEffect(() => {
    if (seasonData?.episode.length > 0) {
      let prevList: EpisodePlayerList = {};
      let playerServerList = {};
      for (let episode of seasonData.episode) {
        episode.playerUrl.map((play, playIndex) => {
          prevList[play.name] = prevList[play.name]
            ? [
                ...prevList[play.name],
                {
                  ...episode.playerUrl[playIndex],
                  sequence: episode.sequence,
                  episodeId: episode.id,
                },
              ]
            : [
                {
                  ...episode.playerUrl[playIndex],
                  sequence: episode.sequence,
                  episodeId: episode.id,
                },
              ];
        });
      }
      for (let playServer of playerServer) {
        playerServerList = {
          ...playerServerList,
          [playServer.name]: [],
        };
      }
      setEpisodeList({
        ...playerServerList,
        ...prevList,
      });
      setSelectedServer(playerServer[0]?.name);
    }
  }, [seasonData, playerServer]);

  const onSelectedChange = async (
    e: React.MouseEvent<HTMLButtonElement>,
    selected: string
  ) => {
    e.preventDefault();
    setSelectedServer(selected);
  };

  const onEpisodeListChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    episodeIndex: number,
    key: string
  ) => {
    e.preventDefault();
    setEpisodeList((prevList) => {
      let newEpisodeList = [...prevList[selectedServer]];
      newEpisodeList[episodeIndex] = {
        ...newEpisodeList[episodeIndex],
        [key]: e.target.value,
      };
      return {
        ...prevList,
        [selectedServer]: newEpisodeList,
      };
    });
  };

  const onGenerateVidsrc = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const playerServerVidscr = playerServer.find(
      (player) => player.name == "Vidsrc"
    );
    const baseUrlVidsrc = playerServerVidscr?.baseUrl;
    setEpisodeList((prevList) => {
      let newVidscrList = [...prevList["Vidsrc"]];
      prevList["Vidsrc"].map((player, playerIndex) => {
        newVidscrList[playerIndex] = {
          ...newVidscrList[playerIndex],
          url: `${baseUrlVidsrc}tv/${imdbId}/${seasonData.sequence}/${player.sequence}`,
        };
      });
      return {
        ...prevList,
        ["Vidsrc"]: newVidscrList,
      };
    });
  };

  const onGenerate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onGeneratePlayer(e, episodeList);
    onClose(e);
  };
  return (
    <>
      {visible && (
        <div className="z-10 flex justify-center items-center bg-slate-700 fixed left-0 top-0 h-full w-full bg-opacity-50">
          <div className="bg-[#fff] max-h-[80vh] overflow-auto rounded-md p-6 text-center">
            <div className="flex flex-1 justify-end">
              <button
                onClick={(e) => {
                  onClose(e);
                }}
              >
                X
              </button>
            </div>
            <div className="flex flex-row justify-around my-2">
              {playerServer.map((playServer, index) => {
                return (
                  <button
                    onClick={(e) => onSelectedChange(e, playServer.name)}
                    className={`${
                      selectedServer == playServer.name
                        ? "bg-tertiary"
                        : "bg-[#fff]"
                    } rounded py-1 px-2`}
                  >
                    {playServer.name}
                  </button>
                );
              })}
            </div>
            {/* <div className="text-4xl mb-6">List Player {selectedServer}</div> */}
            <>
              {selectedServer == "Vidsrc" && (
                <button
                  className="bg-tertiary shadow-md p-2 w-full rounded"
                  onClick={(e) => onGenerateVidsrc(e)}
                >
                  GENERATE VIDSRC
                </button>
              )}
              {episodeList[selectedServer]?.length > 0 &&
                episodeList[selectedServer]?.map((eps, episodeIndex) => {
                  return (
                    <div
                      key={episodeIndex}
                      className="flex flex-row rounded pr-2 items-center bg-tertiary my-2"
                    >
                      <div>
                        <FieldHorizontal
                          unedit
                          name="Sequence"
                          value={eps?.sequence?.toString()}
                          conf={{
                            onChange(e) {
                              onEpisodeListChange(e, episodeIndex, "sequence");
                            },
                          }}
                        />
                      </div>
                      <FieldHorizontal
                        name="Url"
                        value={eps?.url}
                        conf={{
                          onChange(e) {
                            onEpisodeListChange(e, episodeIndex, "url");
                          },
                        }}
                      />
                    </div>
                  );
                })}
              {episodeList[selectedServer]?.length > 0 && (
                <button
                  className="bg-secondary p-2 w-full rounded"
                  onClick={(e) => onGenerate(e)}
                >
                  GENERATE
                </button>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneratePlayerGenerateModal;
