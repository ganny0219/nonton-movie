import FieldHorizontal from "@/components/field/field-horizontal";
import { Movie, Track } from "@/types/movie";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateMovieData } from "@/store/movie";
import EditButton from "@/components/button/edit-button";
import axios from "axios";
import { data } from "autoprefixer";
import { setVttFile } from "@/store/vtt-file";
import { apiAxios } from "@/utils/axios";

type Props = {
  updateMode?: boolean;
  track: Track[];
  movieId?: string;
  movieSlug: string;
};

function TrackInput({ updateMode, movieId, movieSlug }: Props) {
  const { track } = useSelector((state: RootState) => state.movie);
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
    const fileName = `${movieSlug}-${track[
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
    dispatch(updateMovieData({ track: newTrack }));
  };

  const inputLanguageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
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
    dispatch(updateMovieData({ track: newTrack }));
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
          `${movieSlug}-${track[trackIndex].language.toLowerCase()}.vtt`
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
    dispatch(updateMovieData({ track: newTrack }));
  };

  const onTambahTrack = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const newTrack = [...track];
    if (language != "") {
      newTrack.unshift({
        language: language,
        url: "",
      });
      dispatch(updateMovieData({ track: newTrack }));
      setLanguage("");
    }
  };

  const editTrackToggel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editTrack) {
      if (!editTrack) {
        await apiAxios
          .patch(`/track/update-track`, {
            movieId: movieId,
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
    <div className="bg-[#ffffff80] flex flex-col px-2 mt-6 rounded">
      <div className="flex flex-row items-center my-4">
        <h3 className="text-xl mr-2 w-[20%]">Track</h3>
        <input
          disabled={editTrack}
          value={language}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              onTambahTrack();
            }
          }}
          onChange={inputLanguageHandler}
          className="mr-4 rounded outline-none px-2 disabled:text-[#31313190]"
          placeholder={`Add Language`}
        />
        <button
          disabled={editTrack}
          className="bg-[#fff] px-2 h-auto aspect-square rounded"
          onClick={onTambahTrack}
        >
          +
        </button>
        {updateMode && (
          <EditButton
            toggleHandler={editTrackToggel}
            title="Track"
            edit={editTrack}
          />
        )}
      </div>
      {track.map((trk, trackIndex) => {
        let checkVttReady = false;
        if (vttFile && vttFile.length > 0) {
          for (let file of vttFile) {
            if (
              file.name ==
              `${movieSlug}-${track[trackIndex].language.toLowerCase()}.vtt`
            ) {
              checkVttReady = true;
            }
          }
        }
        return (
          <div key={trackIndex} className="flex flex-row items-center">
            <FieldHorizontal
              disabled={editTrack}
              name="Language"
              value={trk.language}
              conf={{
                onChange: (e) => inputChangeHandler(e, "language", trackIndex),
              }}
            />
            <FieldHorizontal
              disabled={editTrack}
              name="Url"
              value={trk.url}
              conf={{
                onChange: (e) => inputChangeHandler(e, "url", trackIndex),
              }}
            />
            <label
              htmlFor={`vvt-${trk.language}`}
              className={`cursor-pointer ${
                !editTrack ? " bg-[#fff]" : "hidden bg-[#ffffff80]"
              } shadow-md w-[30%] py-1 mr-2 rounded text-center`}
            >
              Vtt {checkVttReady ? "Ready" : "Empty"}
            </label>
            <input
              disabled={editTrack}
              id={`vvt-${trk.language}`}
              type="file"
              className="hidden"
              onChange={(e) => inputVttFile(e, trackIndex)}
            />
            {!editTrack && (
              <button
                className="bg-red-500 p-1 w-[10%] rounded justify-center items-center"
                onClick={(e) => onDelete(e, trackIndex)}
              >
                x
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TrackInput;
