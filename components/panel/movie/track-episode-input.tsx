import FieldHorizontal from "@/components/field/field-horizontal";
import { Movie, Track } from "@/types/movie";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateEpisodeData, updateMovieData } from "@/store/movie";
import EditButton from "@/components/button/edit-button";
import axios from "axios";
import { setVttFile } from "@/store/vtt-file";
import { apiAxios } from "@/utils/axios";

type Props = {
  editEpisode?: boolean;
  episodeIndex: number;
  seasonIndex: number;
  updateMode?: boolean;
  episodeSlug: string;
  movieId?: string;
  episodeId?: string;
};

function TrackEpisodeInput({
  editEpisode,
  seasonIndex,
  episodeIndex,
  updateMode,
  movieId,
  episodeSlug,
  episodeId,
}: Props) {
  const movieData = useSelector((state: RootState) => state.movie);
  const track = movieData.season[seasonIndex].episode[episodeIndex].track;
  const [language, setLanguage] = useState("");
  const [editTrack, setEditTrack] = useState(updateMode ? true : false);
  const vttFile = useSelector((state: RootState) => state.vttFile);
  const removedTrack = useRef<Track[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setVttFile([]));
  }, [movieId]);

  const inputVttFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    trackIndex: number
  ) => {
    e.preventDefault();
    const fileName = `${episodeSlug}-${track[
      trackIndex
    ].language.toLowerCase()}.vtt`;
    let duplicate = false;
    if (vttFile) {
      for (let file of vttFile) {
        if (file.name == fileName) {
          duplicate = true;
        }
      }
    }

    if (e.target.files && !duplicate) {
      const newFile = new File([e.target.files[0]], fileName);
      const newVttFile = vttFile ? [newFile, ...vttFile] : [newFile];
      dispatch(setVttFile(newVttFile));
    }
    const newTrack = [...track];
    newTrack[trackIndex] = {
      ...newTrack[trackIndex],
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/vtt/${fileName}`,
    };
    console.log(newTrack);

    dispatch(
      updateEpisodeData({
        seasonIndex,
        episodeIndex,
        key: "track",
        value: newTrack,
      })
    );
  };

  const inputLanguageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
  };

  const onTambahTrack = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (language != "") {
      const newTrack = [...track];
      newTrack.push({ language: language, url: "" });

      dispatch(
        updateEpisodeData({
          seasonIndex,
          episodeIndex,
          key: "track",
          value: newTrack,
        })
      );
      setLanguage("");
    }
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    trackIndex: number
  ) => {
    const newTrack = [...track];
    newTrack[trackIndex] = {
      ...newTrack[trackIndex],
      [key]: e.target.value,
    };

    dispatch(
      updateEpisodeData({
        seasonIndex,
        episodeIndex,
        key: "track",
        value: newTrack,
      })
    );
  };

  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    trackIndex: number
  ) => {
    e.preventDefault();
    const newVttFile: File[] = [];
    if (vttFile) {
      for (let vtt of vttFile) {
        if (
          vtt.name !=
          `${episodeSlug}-${track[trackIndex].language.toLowerCase()}.vtt`
        ) {
          newVttFile.push(vtt);
        }
      }
    }
    dispatch(setVttFile(newVttFile));

    if (track[trackIndex].id) {
      removedTrack.current.push(track[trackIndex]);
    }
    const newTrack = [...track];
    newTrack.splice(trackIndex, 1);

    dispatch(
      updateEpisodeData({
        episodeIndex,
        seasonIndex,
        key: "track",
        value: newTrack,
      })
    );
  };
  const editTrackToggel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editTrack) {
      if (!editTrack) {
        await apiAxios
          .post(`/track/update-episode-track`, {
            episodeId: episodeId,
            track: track,
            removedTrack: removedTrack.current,
          })
          .then(async (res) => {
            if (vttFile && track.length > 0) {
              const formData = new FormData();
              for (let file of vttFile) {
                formData.append("files", file);
              }
              await apiAxios.post(`/insert-vtt`, formData);
            }
          });
        removedTrack.current = [];
        return setEditTrack((prev) => !prev);
      }
    }
    setEditTrack((prev) => !prev);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center my-2 px-2">
        <h3 className="mr-2 w-[20%]">Track</h3>
        <input
          disabled={editEpisode || editTrack}
          value={language}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              onTambahTrack();
            }
          }}
          onChange={inputLanguageHandler}
          className="mr-4 rounded outline-none px-2"
          placeholder={`Add Language`}
        />
        <button
          disabled={editEpisode || editTrack}
          className={`${
            editEpisode || editTrack ? "bg-[ffffff90]" : "bg-[#fff]"
          }  px-2 h-auto aspect-square rounded`}
          onClick={onTambahTrack}
        >
          +
        </button>
        {updateMode && !editEpisode && (
          <EditButton
            toggleHandler={editTrackToggel}
            title="Track"
            edit={editTrack}
          />
        )}
      </div>
      <div className="w-full">
        {track?.map((trk, trackIndex) => {
          let checkVttReady = false;
          if (vttFile && vttFile.length > 0) {
            for (let file of vttFile) {
              if (
                file.name ==
                `${episodeSlug}-${track[trackIndex].language.toLowerCase()}.vtt`
              ) {
                checkVttReady = true;
              }
            }
          }
          return (
            <div key={trackIndex} className="flex flex-row items-center">
              <FieldHorizontal
                disabled={editEpisode || editTrack}
                name="Language"
                value={trk.language}
                conf={{
                  onChange: (e) =>
                    inputChangeHandler(e, "language", trackIndex),
                }}
              />
              <FieldHorizontal
                disabled={editEpisode || editTrack}
                name="Url"
                value={trk.url}
                conf={{
                  onChange: (e) => inputChangeHandler(e, "url", trackIndex),
                }}
              />
              <label
                htmlFor={`vvt-${episodeSlug}-${trk.language}`}
                className={`cursor-pointer ${
                  !editTrack ? " bg-[#fff]" : "hidden bg-[#ffffff80]"
                } shadow-md w-[30%] py-1 mr-2 rounded text-center`}
              >
                Vtt {checkVttReady ? "Ready" : "Empty"}
              </label>
              <input
                id={`vvt-${episodeSlug}-${trk.language}`}
                disabled={editEpisode || editTrack}
                type="file"
                className="hidden"
                onChange={(e) => inputVttFile(e, trackIndex)}
              />
              {!editEpisode && (
                <button
                  disabled={editEpisode || editTrack}
                  className={`${
                    editEpisode || editTrack ? "bg-red-300" : "bg-red-500"
                  } p-1 w-[10%] rounded justify-center items-center`}
                  onClick={(e) => onDelete(e, trackIndex)}
                >
                  x
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrackEpisodeInput;
