import EditButton from "@/components/button/edit-button";
import {
  deleteEpisodeData,
  generateEpisodeData,
  insertEpisodeData,
  insertNewEpisodeData,
  updateAllEpisodeData,
  updateEpisodeData,
  updateMovieData,
} from "@/store/movie";
import { Episode, EpisodePlayerList, PlayerUrl, Season } from "@/types/movie";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrackEpisodeInput from "./track-episode-input";
import PlayerEpisodeUrlInput from "./player-episode-url-input";
import FieldHorizontal from "@/components/field/field-horizontal";
import Loading from "@/components/loading";
import GlobalPlayerGenerateModal from "./global-player-generate-modal";
import GoogleGenerateEpisodeModal from "./google-generate-episode-modal";
import { apiAxios } from "@/utils/axios";
import { convertRating } from "@/utils/client-function/global";
import { PlayerServer } from "@/types/player-server";
import { RootState } from "@/store";

type Props = {
  seasonIndex: number;
  generateSeasonToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  updateMode?: boolean;
  generateSeason?: boolean;
  playerServerList: PlayerServer[];
  // season: Season;
};

type Removed = string | undefined;

function EpisodeInput({
  seasonIndex,
  // season,
  generateSeason,
  generateSeasonToggle,
  updateMode,
  playerServerList,
}: Props) {
  const movieData = useSelector((state: RootState) => state.movie);
  const {
    imdbId,
    title: movieTitle,
    originalTitle,
    type: movieType,
    id: movieId,
  } = movieData;
  const season = movieData.season[seasonIndex];
  const episode = season?.episode;
  const [imdbIdGenerate, setImdbIdGenerate] = useState(imdbId);
  const [seasonGenerate, setSeasonGenerate] = useState(seasonIndex + 1);
  const [untilEps, setUntilEps] = useState(0);
  const [editEpisode, setEditEpisode] = useState(updateMode ? true : false);
  const [generateModal, setGenerateModal] = useState(false);
  const [generateGoogleModal, setGenerateGoogleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const removedEpisodeId = useRef<Removed[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    removedEpisodeId.current = [];
  }, [movieData.id]);

  useEffect(() => {
    setImdbIdGenerate(imdbId);
    setSeasonGenerate(seasonIndex + 1);
  }, [seasonIndex]);

  const onGenerateEpisode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await apiAxios
      .get(`/generate-season-detail`, {
        params: {
          imdbId: imdbIdGenerate,
          season: seasonGenerate,
          untilEps: untilEps,
          mainTitle: originalTitle ? originalTitle : movieTitle,
        },
      })
      .then(async (res) => {
        setLoading(false);
        let episodeResult: Episode[] = await res.data.episode;
        let newEpisode: Episode[] = [];
        const prevEpisode: Episode[] = season.episode;
        prevEpisode.map((episode) => {
          if (episode.id && episodeResult.length >= episode.sequence - 1) {
            episodeResult[episode.sequence - 1] = {
              id: episode.id,
              totalRating: episode.totalRating,
              rating: episode.rating,
              plot: episodeResult[episode.sequence - 1].plot,
              slug: episodeResult[episode.sequence - 1].slug,
              title: episodeResult[episode.sequence - 1].title,
              views: episode.views,
              sequence: episodeResult[episode.sequence - 1].sequence,
              released: episodeResult[episode.sequence - 1].released,
              poster: episodeResult[episode.sequence - 1].poster,
              playerUrl: episode.playerUrl,
              track: episode.track,
              vote: episode.vote,
            };
          }
        });
        for await (let epsRes of episodeResult) {
          if (epsRes.playerUrl.length == 0) {
            const playerSet: PlayerUrl[] = [];
            for await (let playServer of playerServerList) {
              playerSet.push({
                name: playServer.name,
                url: playServer.baseUrl,
              });
            }
            newEpisode.push({
              ...epsRes,
              poster: !epsRes.poster.includes("null")
                ? epsRes.poster
                : season.poster,
              playerUrl: playerSet,
            });
          } else {
            newEpisode.push({
              ...epsRes,
              poster: !epsRes.poster.includes("null")
                ? epsRes.poster
                : season.poster,
            });
          }
        }
        if (updateMode) {
          const newEpisodeResult: Episode[] = await apiAxios
            .patch(`/episode/update`, {
              seasonId: season.id,
              episode: newEpisode.reverse(),
              removedEpisodeId: removedEpisodeId.current,
            })
            .then((res) => (newEpisode = res.data));
          return dispatch(
            generateEpisodeData({
              seasonReleased: res.data.episode[0].released,
              episodeData: newEpisodeResult,
              seasonIndex,
            })
          );
        } else {
          return dispatch(
            generateEpisodeData({
              episodeData: newEpisode.reverse(),
              seasonReleased: res.data.episode[0].released,
              seasonIndex,
            })
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const onGeneratePlayer = async (
    e: React.MouseEvent<HTMLButtonElement>,
    episodeList?: EpisodePlayerList
  ) => {
    e.preventDefault();
    const newEpisodeData: Episode[] = [];
    const playerList: PlayerUrl[] = [];
    let counter = 0;
    for await (let eps of episode) {
      const newEpisodePlayer: PlayerUrl[] = [];
      if (episodeList) {
        for await (let playServer of playerServerList) {
          newEpisodePlayer.push({
            id: episodeList[playServer.name][counter].id,
            url: episodeList[playServer.name][counter].url,
            name: playServer.name,
          });
          playerList.push({
            id: episodeList[playServer.name][counter].id,
            url: episodeList[playServer.name][counter].url,
            name: playServer.name,
          });
        }
      }
      newEpisodeData.push({
        ...eps,
        playerUrl: newEpisodePlayer,
      });
      counter = counter + 1;
    }
    if (updateMode) {
      await apiAxios
        .patch(`/player/update-episode-player`, {
          playerList,
        })
        .then((res) => res.data);
    }
    return dispatch(
      updateAllEpisodeData({ seasonIndex, episodeData: newEpisodeData })
    );
  };

  const onNewEpisode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    await apiAxios
      .get(`/generate-new-episode-detail`, {
        params: {
          imdbId: imdbIdGenerate,
          season: seasonGenerate,
          sequence: episode.length > 0 ? episode[0].sequence : 0,
          mainTitle: originalTitle ? originalTitle : movieTitle,
        },
      })
      .then(async (res) => {
        setLoading(false);
        let newEpisodeData: Episode = {
          ...res.data,
          poster: !res.data.poster.includes("null")
            ? res.data.poster
            : season.poster,
        };
        const playerSet: PlayerUrl[] = [];
        for (let playServer of playerServerList) {
          playerSet.push({
            name: playServer.name,
            url: playServer.baseUrl,
          });
        }
        newEpisodeData = {
          ...newEpisodeData,
          playerUrl: playerSet,
        };
        if (updateMode) {
          await apiAxios
            .post<Episode>(`/episode/insert-new-episode`, {
              seasonId: season.id,
              episode: newEpisodeData,
            })
            .then((res) => {
              newEpisodeData = {
                ...newEpisodeData,
                ...res.data,
              };
            });
        }
        dispatch(
          insertNewEpisodeData({
            newEpisodeData,
            seasonIndex,
          })
        );
        generateModalHandler(e);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const editEpisodeToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!editEpisode) {
      for (let eps of episode) {
        if (eps.slug == "") {
          return alert(`Mohon Isi Slug Epsiode ${eps.sequence}`);
        }
      }
      const newEpisode: Episode[] = await apiAxios
        .patch(`/episode/update`, {
          seasonId: season.id,
          episode: episode,
          removedEpisodeId: removedEpisodeId.current,
        })
        .then((res) => res.data);
      if (generateSeasonToggle) generateSeasonToggle(e);
      removedEpisodeId.current = [];
      setEditEpisode((prev) => !prev);
      return dispatch(
        updateAllEpisodeData({ episodeData: newEpisode, seasonIndex })
      );
    }
    removedEpisodeId.current = [];
    setEditEpisode((prev) => !prev);
    if (generateSeasonToggle) generateSeasonToggle(e);
  };

  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    episodeIndex: number
  ) => {
    if (episode[episodeIndex].id != undefined) {
      removedEpisodeId.current.push(episode[episodeIndex].id);
    }
    dispatch(deleteEpisodeData({ episodeIndex, seasonIndex }));
  };

  const inputEpisodeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    episodeIndex: number
  ) => {
    dispatch(
      updateEpisodeData({
        seasonIndex,
        episodeIndex,
        key,
        value: e.target.value,
      })
    );
  };

  const generateModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setGenerateModal((prev) => !prev);
  };

  const generateGoogleModalHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setGenerateGoogleModal((prev) => !prev);
  };

  const onAddEpisode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      insertEpisodeData({
        movieTitle,
        seasonIndex,
        playerServerList,
        lastEpisodeSquence:
          season.episode.length > 0 ? season.episode[0].sequence : 0,
      })
    );
  };

  return (
    <>
      <Loading visible={loading} />
      <GlobalPlayerGenerateModal
        playerServer={playerServerList}
        imdbId={imdbId}
        visible={generateModal}
        onClose={generateModalHandler}
        onGeneratePlayer={onGeneratePlayer}
        seasonData={season}
      />
      <GoogleGenerateEpisodeModal
        update={updateMode}
        visible={generateGoogleModal}
        onClose={generateGoogleModalHandler}
        seasonIndex={seasonIndex}
        imdbId={imdbId}
        movieTitle={movieTitle}
        season={seasonIndex}
        movieType={movieType}
      />
      <div className="flex flex-row mt-4 justify-center items-center">
        <div className="flex flex-col items-center">
          <p className="text-red-500">
            #NOTE: Biarkan Until Episode 0 jika ingin mendapatkan semua episode.
          </p>
          <div className="flex flex-row items-center">
            <FieldHorizontal
              disabled={generateSeason}
              value={imdbIdGenerate}
              name="ImdbId"
              conf={{ onChange: (e) => setImdbIdGenerate(e.target.value) }}
            />
            <FieldHorizontal
              disabled={generateSeason}
              value={seasonGenerate.toString()}
              name="Season"
              conf={{ onChange: (e) => setSeasonGenerate(+e.target.value) }}
            />
            <FieldHorizontal
              disabled={generateSeason}
              value={untilEps.toString()}
              name="UntilEpisode"
              conf={{ onChange: (e) => setUntilEps(+e.target.value) }}
            />
            <button
              className="bg-[#fff] px-2 py-[4px] w-full rounded disabled:bg-[#ffffff90]"
              onClick={onGenerateEpisode}
              disabled={updateMode && generateSeason}
            >
              Generate Episode
            </button>
          </div>
          <div className="flex flex-row items-center">
            <button
              // disabled={generateSeason}
              className="bg-[#fff] px-2 w-full rounded p-1 ml-2 disabled:bg-[#ffffff90] "
              onClick={generateGoogleModalHandler}
            >
              Google Generate
            </button>
            <button
              disabled={generateSeason}
              className="whitespace-nowrap px-2 bg-[#fff] w-full rounded p-1 ml-2 disabled:bg-[#ffffff90] "
              onClick={generateModalHandler}
            >
              Generate Global Player
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#ffffff80] flex flex-col px-2 mt-6 rounded">
        <div className="flex flex-row items-center my-4">
          <h1 className="text-xl mr-6">Episodes</h1>

          <button
            disabled={editEpisode}
            className="bg-[#fff] px-2 mr-2 py-1 rounded text-sm disabled:bg-[#ffffff90]"
            onClick={onAddEpisode}
          >
            + Episode
          </button>
          {updateMode && (
            <>
              <button
                // disabled={editEpisode}
                className="bg-[#fff] px-2 py-1 rounded text-sm disabled:bg-[#ffffff90]"
                onClick={onNewEpisode}
              >
                + New Episode
              </button>
              <EditButton
                edit={editEpisode}
                title="Episode"
                toggleHandler={editEpisodeToggle}
              />
            </>
          )}
        </div>
        {episode != undefined &&
          episode.map((episode, episodeIndex) => {
            return (
              <div
                key={episodeIndex}
                className="bg-[#ffffff80] rounded my-4 p-2 shadow-md"
              >
                <div className="flex justify-end pr-2 text-red-500 font-bold text-xl">
                  {!editEpisode && (
                    <button onClick={(e) => onDelete(e, episodeIndex)}>
                      X
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 mt-2 ">
                  <FieldHorizontal
                    disabled={editEpisode}
                    name="Sequence"
                    value={episode?.sequence?.toString()}
                    conf={{
                      onChange: (e) =>
                        inputEpisodeHandler(e, "sequence", episodeIndex),
                    }}
                  />
                  <FieldHorizontal
                    disabled={editEpisode}
                    name="Title"
                    value={episode.title}
                    conf={{
                      onChange: (e) =>
                        inputEpisodeHandler(e, "title", episodeIndex),
                    }}
                  />
                  <FieldHorizontal
                    disabled={editEpisode}
                    name="Release"
                    value={episode.released}
                    placeholder="Ex. Sun, Jun 4, 2015"
                    conf={{
                      onChange: (e) =>
                        inputEpisodeHandler(e, "released", episodeIndex),
                    }}
                  />
                  <FieldHorizontal
                    disabled={editEpisode}
                    name="Poster"
                    value={episode.poster}
                    conf={{
                      onChange: (e) =>
                        inputEpisodeHandler(e, "poster", episodeIndex),
                    }}
                  />
                  <FieldHorizontal
                    required
                    disabled={editEpisode}
                    name="Slug"
                    placeholder="title-season-episode"
                    value={episode.slug}
                    conf={{
                      onChange: (e) =>
                        inputEpisodeHandler(e, "slug", episodeIndex),
                    }}
                  />
                  <FieldHorizontal
                    disabled={editEpisode}
                    name="Imdb Rating"
                    placeholder="title-season-episode"
                    value={convertRating(episode.rating)}
                    conf={{
                      onChange: (e) =>
                        inputEpisodeHandler(e, "slug", episodeIndex),
                    }}
                  />
                </div>
                <div className="flex flex-col mx-2">
                  <label>Plot</label>
                  <textarea
                    disabled={editEpisode}
                    value={episode.plot}
                    className="rounded outline-none p-2"
                    onChange={(e) =>
                      inputEpisodeHandler(e, "plot", episodeIndex)
                    }
                  />
                </div>
                <TrackEpisodeInput
                  editEpisode={editEpisode}
                  episodeIndex={episodeIndex}
                  seasonIndex={seasonIndex}
                  updateMode={updateMode}
                  episodeSlug={episode.slug}
                  episodeId={episode.id}
                  movieId={movieId}
                />
                <PlayerEpisodeUrlInput
                  editEpisode={editEpisode}
                  episodeIndex={episodeIndex}
                  seasonIndex={seasonIndex}
                  updateMode={updateMode}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default EpisodeInput;
