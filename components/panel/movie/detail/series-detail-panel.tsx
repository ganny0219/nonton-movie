"use client";
import type { Movie } from "@/types/movie";
import React, { useEffect, useState } from "react";

import Field from "@/components/field/field";

import CastInput from "@/components/panel/movie/cast-input";
import GenreInput from "@/components/panel/movie/genre-input";

import Loading from "@/components/loading";
import SeasonInput from "@/components/panel/movie/season-input";
import { useSelector, useDispatch, Provider } from "react-redux";
import { RootState } from "@/store";
import { updateMovieData, setSeriesData } from "@/store/movie";

import EditButton from "@/components/button/edit-button";

import { apiAxios } from "@/utils/axios";
import { convertRating } from "@/utils/client-function/global";

import { productionList, resolutionList } from "@/data/radio";
import SingleSelectionRadio from "@/components/radio-button/single-selection-radio";
import { PlayerServer, PlayerServerJson } from "@/types/player-server";

type Props = {
  movie: Movie;
  playerServerList: PlayerServer[];
  playerServerListJson: PlayerServerJson;
};

function SeriesDetailPanel({
  movie,
  playerServerList,
  playerServerListJson,
}: Props) {
  const [imdbIdGenerate, setImdbIdGenerate] = useState(movie.imdbId);
  const [editDetail, setEditDetail] = useState(true);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const movieData = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    dispatch(
      updateMovieData({
        ...movie,
      })
    );
    return () => {
      dispatch(setSeriesData());
    };
  }, []);

  const onInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    key: string
  ) => {
    dispatch(
      updateMovieData({
        [key]: key == "rating" ? +e.target.value : e.target.value,
      })
    );
  };

  const editDetailToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!editDetail) {
      if (movieData.production == "") {
        return alert("Isi Producton!");
      }
      if (movieData.year == "") {
        return alert("Isi Year!");
      }
      if (movieData.title == "") {
        return alert("Isi Title!");
      }
      if (movieData.slug == "") {
        return alert("Isi Slug!");
      }

      return await apiAxios
        .patch(`/movie/update-detail`, {
          movieData: movieData,
        })
        .then(() => {
          return setEditDetail((prev) => !prev);
        })
        .catch((err) => {
          return alert(
            err.message.includes("422")
              ? "Slug Sudah Ada"
              : "Terjadi Kesalahan Pada System!"
          );
        });
    }
    setEditDetail((prev) => !prev);
  };

  const onGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    await apiAxios
      .get(`/generate-movie-detail`, {
        params: {
          imdbId: imdbIdGenerate,
          type: movieData.type,
          create: "false",
        },
      })
      .then(async (res) => {
        setLoading(false);
        dispatch(updateMovieData({ ...res.data }));
      })
      .catch((err) => {
        setLoading(false);
        alert(
          err.message.includes("422")
            ? "Movie Sudah Ada"
            : "Terjadi Kesalahan Pada System!"
        );
      });
  };

  return (
    <>
      <Loading visible={loading} />
      <div className="flex flex-row w-full mt-4 justify-center items-center">
        <div className="flex flex-row mr-4 justify-center items-center">
          <label className="text-xl">IMDB ID</label>
          <input
            disabled={editDetail}
            value={imdbIdGenerate}
            className="rounded outline-none ml-2 p-1"
            onChange={(e) => setImdbIdGenerate(e.target.value)}
          />
        </div>
        <button
          disabled={editDetail}
          className="bg-[#fff] p-1 rounded disabled:bg-[#ffffff90]"
          onClick={onGenerate}
        >
          Generate Detail
        </button>
      </div>
      <div className="bg-[#ffffff80] flex flex-col px-2 mt-6 rounded w-full py-4">
        <EditButton
          edit={editDetail}
          toggleHandler={editDetailToggle}
          title="Detail"
        />
        <div className=" grid grid-cols-2 gap-x-6 gap-y-2 w-full ">
          <Field
            disabled={editDetail}
            value={movieData.trailerUrl}
            name="Trailer Url"
            conf={{ onChange: (e) => onInputChange(e, "trailerUrl") }}
          />
          <div className="flex flex-col">
            <h3 className="text-xl">Production</h3>
            <div className="grid grid-cols-2">
              <SingleSelectionRadio
                radioList={productionList.series}
                currentValue={movieData.production}
                defaultValue="Official"
              />
            </div>
          </div>
          <Field
            disabled={editDetail}
            value={movieData.title}
            required
            name="Title"
            conf={{ onChange: (e) => onInputChange(e, "title") }}
          />
          <Field
            disabled={editDetail}
            value={movieData.slug}
            required
            placeholder="title-year"
            name="Slug"
            conf={{ onChange: (e) => onInputChange(e, "slug") }}
          />
          <Field
            disabled={editDetail}
            value={movieData.year}
            required
            name="Year"
            conf={{ onChange: (e) => onInputChange(e, "year") }}
          />
          <Field
            disabled={editDetail}
            value={movieData.rated}
            name="Rated"
            conf={{ onChange: (e) => onInputChange(e, "rated") }}
          />
          <Field
            disabled={editDetail}
            value={movieData.released}
            name="Released Date"
            placeholder="Ex. April 4, 2019"
            conf={{ onChange: (e) => onInputChange(e, "released") }}
          />
          <Field
            disabled={editDetail}
            value={movieData.runtime}
            name="Runtime"
            conf={{ onChange: (e) => onInputChange(e, "runtime") }}
          />
          <Field
            disabled={editDetail}
            value={convertRating(movieData.rating)}
            name="Rating"
            conf={{ onChange: (e) => onInputChange(e, "rating") }}
          />
          <Field
            disabled={editDetail}
            value={movieData.imdbId}
            name="Imdb ID"
            conf={{ onChange: (e) => onInputChange(e, "imdbId") }}
          />

          <Field
            disabled={editDetail}
            value={movieData.language}
            name="Language"
            conf={{ onChange: (e) => onInputChange(e, "language") }}
          />
          <Field
            disabled={editDetail}
            value={movieData.country}
            name="Country"
            conf={{ onChange: (e) => onInputChange(e, "country") }}
          />
          <Field
            disabled={editDetail}
            value={movieData.poster}
            name="Poster"
            conf={{ onChange: (e) => onInputChange(e, "poster") }}
          />
          <div className="flex flex-col mt-1">
            <h3 className="text-xl">Resolution</h3>
            <div className="grid grid-cols-2">
              <SingleSelectionRadio
                radioList={resolutionList}
                currentValue={movieData.resolution}
                defaultValue="HD"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 w-full mt-2">
          <div className="flex flex-col">
            <label className="text-xl">Plot</label>
            <textarea
              disabled={editDetail}
              value={movieData.plot}
              className="rounded outline-none p-2  disabled:text-[#31313190]"
              onChange={(e) => onInputChange(e, "plot")}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <SeasonInput playerServerList={playerServerList} updateMode />
        <GenreInput updateMode />
        <CastInput type="Director" data={movieData.director} updateMode />
        <CastInput type="Writer" data={movieData.writer} updateMode />
        <CastInput type="Actor" data={movieData.actor} updateMode />
      </div>
    </>
  );
}

export default SeriesDetailPanel;
