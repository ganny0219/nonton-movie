"use client";
import FieldHorizontal from "@/components/field/field-horizontal";
import Line from "@/components/line";
import { Season } from "@/types/movie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSeasonData,
  insertSeasonData,
  updateSeasonData,
} from "@/store/movie";
import EpisodeInput from "./episode-input";
import EditButton from "@/components/button/edit-button";
import DeleteConfirm from "@/components/delete-confirm";
import { apiAxios } from "@/utils/axios";
import { convertRating } from "@/utils/client-function/global";
import { PlayerServer } from "@/types/player-server";
import { RootState } from "@/store";

type Props = {
  updateMode?: boolean;
  playerServerList: PlayerServer[];
};

export const createSlugSeason = (title: string, seasonSquence: number) => {
  return (
    title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replaceAll(" ", "-") +
    "-" +
    "season-" +
    seasonSquence
  );
};

function SeasonInput({ updateMode, playerServerList }: Props) {
  const movieData = useSelector((state: RootState) => state.movie);
  const { title: movieTitle, id: movieId, poster: moviePoster } = movieData;
  const seasonData = movieData.season;
  const [selectValue, setSelectValue] = useState(seasonData.length - 1);
  const season = movieData.season[selectValue];
  const [deleteSeasonModal, setDeleteSeasonModal] = useState(false);
  const [editSeason, setEditSeason] = useState(updateMode ? true : false);
  const [generateSeason, setGenerateSeason] = useState(
    updateMode ? true : false
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setSelectValue(seasonData.length - 1);
  }, [movieId]);

  const onSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(+e.target.value);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    dispatch(
      updateSeasonData({ value: e.target.value, key, index: selectValue })
    );
  };

  const onTambahSeason = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    let id = undefined;
    if (updateMode) {
      await apiAxios
        .post(`/season/insert`, {
          seasonData: {
            name: `Season ${seasonData.length + 1}`,
            sequence: seasonData.length + 1,
            rating: "10",
            totalRating: 10,
            released: "",
            trailerUrl: "",
            poster: moviePoster,
            slug: createSlugSeason(movieTitle, seasonData.length + 1),
            vote: [],
            episode: [],
          },
          movieId: movieId,
        })
        .then(async (res) => {
          const data = res.data;
          id = data.id;
        });
    }
    dispatch(
      insertSeasonData({
        id: id ? id : undefined,
        name: `Season ${seasonData.length + 1}`,
        sequence: seasonData.length + 1,
        rating: "10",
        totalRating: 10,
        poster: moviePoster,
        trailerUrl: "",
        released: "",
        slug: createSlugSeason(movieTitle, seasonData.length + 1),
        vote: [],
        episode: [],
      })
    );
    setSelectValue(seasonData.length);
  };

  const deleteSeasonHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
    setDeleteSeasonModal(true);
  };

  const onDeleteSeason = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    setSelectValue(seasonData.length - 2);
    setDeleteSeasonModal(false);
    if (updateMode) {
      await apiAxios.delete(`/season/delete`, {
        params: {
          seasonId: season?.id,
        },
      });
    }
    setGenerateSeason(true);
    setEditSeason(true);
    dispatch(deleteSeasonData({ index: selectValue }));
  };

  const generateSeasonToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setGenerateSeason((prev) => !prev);
  };

  const editSeasonToggle = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (!editSeason) {
      if (season?.name.trim() == "") {
        return alert("Tambahkan Nama Season");
      }
      await apiAxios.patch(`/season/update`, {
        seasonData: seasonData[selectValue],
        movieId: movieId,
      });
      return setEditSeason((prev) => !prev);
    }
    setEditSeason((prev) => !prev);
  };

  return (
    <>
      <DeleteConfirm
        visible={deleteSeasonModal}
        onClose={setDeleteSeasonModal}
        onConfirm={onDeleteSeason}
      />
      <div className="bg-[#ffffff80] flex flex-col px-2 mt-6 pb-6 rounded">
        <div className="flex flex-row items-center my-2">
          <h3 className="text-2xl mr-4">Season</h3>
          <button
            disabled={updateMode ? !generateSeason || !editSeason : undefined}
            className="bg-[#fff] px-2 h-auto aspect-square rounded"
            onClick={onTambahSeason}
          >
            +
          </button>

          {seasonData.length > 0 && (
            <div className="flex flex-1 justify-end">
              <select
                disabled={
                  updateMode ? !generateSeason || !editSeason : undefined
                }
                className="outline-none p-1 rounded"
                onChange={onSelectionChange}
                value={selectValue}
              >
                {seasonData.map((season, indexOption) => {
                  return (
                    <option key={indexOption} value={indexOption}>
                      {season.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
        {season != undefined && (
          <>
            <Line thin />
            <div className="flex flex-row items-center mt-2">
              <input
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    editSeasonToggle(e);
                  }
                }}
                placeholder="ex. Season 1, Season 2"
                disabled={editSeason}
                className="text-xl pl-2 rounded outline-none mr-2"
                value={season.name}
                onChange={(e) => onInputChange(e, "name")}
              />
              {!editSeason && (
                <button
                  className="mr-2 p-1 px-2 rounded bg-red-400"
                  onClick={(e) => deleteSeasonHandler(e)}
                >
                  Delete Season
                </button>
              )}
              {updateMode && (
                <EditButton
                  edit={editSeason}
                  toggleHandler={editSeasonToggle}
                  title="Season"
                />
              )}
            </div>
            <div className=" grid grid-cols-2">
              <FieldHorizontal
                name="Slug"
                placeholder="ex. 12 Sept 2020"
                disabled={editSeason}
                value={season.slug}
                conf={{ onChange: (e) => onInputChange(e, "slug") }}
              />
              <FieldHorizontal
                name="Sequence"
                placeholder="ex. 12 Sept 2020"
                disabled={editSeason}
                value={season.sequence.toString()}
                conf={{ onChange: (e) => onInputChange(e, "sequence") }}
              />
              <FieldHorizontal
                name="Poster"
                placeholder="poster url."
                disabled={editSeason}
                value={season.poster}
                conf={{ onChange: (e) => onInputChange(e, "poster") }}
              />
              <FieldHorizontal
                name="Released"
                placeholder="Ex. Sun, Jun 4, 2015"
                disabled={editSeason}
                value={season.released}
                conf={{ onChange: (e) => onInputChange(e, "released") }}
              />
              <FieldHorizontal
                name="TrailerUrl"
                disabled={editSeason}
                value={season.trailerUrl}
                conf={{ onChange: (e) => onInputChange(e, "trailerUrl") }}
              />
              <FieldHorizontal
                name="Rating"
                placeholder="ex. 9.0, 5.8"
                disabled={editSeason}
                value={convertRating(season.rating)}
                conf={{ onChange: (e) => onInputChange(e, "rating") }}
              />
            </div>
            <EpisodeInput
              seasonIndex={selectValue}
              generateSeason={generateSeason}
              playerServerList={playerServerList}
              generateSeasonToggle={generateSeasonToggle}
              updateMode={updateMode}
            />
          </>
        )}
      </div>
    </>
  );
}

export default SeasonInput;
