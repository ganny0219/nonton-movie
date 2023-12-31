"use client";
import React, { useEffect, useState } from "react";
import Field from "@/components/field/field";
import Line from "@/components/line";
import CastInput from "@/components/panel/movie/cast-input";
import GenreInput from "@/components/panel/movie/genre-input";
import RootPanel from "@/components/panel/root-panel";
import Loading from "@/components/loading";
import SeasonInput from "@/components/panel/movie/season-input";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateMovieData, setSeriesData } from "@/store/movie";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { setVttFile } from "@/store/vtt-file";
import { apiAxios } from "@/utils/axios";
import { convertRating } from "@/utils/client-function/global";
import SingleSelectionRadio from "@/components/radio-button/single-selection-radio";
import { productionList, resolutionList } from "@/data/radio";
import {
  getPlayerServerListJson,
  getPlayerServerListPanel,
} from "@/utils/server-function/player-server";
import { PlayerServer, PlayerServerJson } from "@/types/player-server";

type Props = {
  playerServerList: PlayerServer[];
  playerServerListJson: PlayerServerJson;
};

function CreateSeriesPanel({ playerServerList, playerServerListJson }: Props) {
  const [imdbIdGenerate, setImdbIdGenerate] = useState("");
  const [loading, setLoading] = useState(false);
  const movieData = useSelector((state: RootState) => state.movie);
  const vttFile = useSelector((state: RootState) => state.vttFile);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSeriesData());
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
    e.preventDefault();
    dispatch(
      updateMovieData({
        [key]: key == "rating" ? +e.target.value : e.target.value,
      })
    );
  };

  const onGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    await apiAxios
      .get(`/generate-movie-detail`, {
        params: {
          imdbId: imdbIdGenerate,
          type: movieData.type,
          create: "true",
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

  const onCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

    setLoading(true);
    await apiAxios
      .post(`/movie/create`, {
        movieData: movieData,
      })
      .then(async (res) => {
        setImdbIdGenerate("");
        setLoading(false);
        if (vttFile && movieData.track.length > 0) {
          const formData = new FormData();
          for (let file of vttFile) {
            formData.append("files", file);
          }
          await apiAxios.post(`/insert-vtt`, formData);
        }
        dispatch(setVttFile([]));
        dispatch(setSeriesData());
      })
      .catch((err) => {
        setLoading(false);
        alert(
          err.message.includes("422")
            ? "Slug Sudah Ada"
            : "Terjadi Kesalahan Pada System!"
        );
      });
  };

  return (
    <>
      <Loading visible={loading} />

      <div className="flex flex-row mt-4 justify-center items-center">
        <div className="flex flex-row mr-4 justify-center items-center">
          <label className="text-xl">IMDB ID</label>
          <input
            value={imdbIdGenerate}
            className="rounded outline-none ml-2 p-1"
            onChange={(e) => setImdbIdGenerate(e.target.value)}
          />
        </div>
        <button className="bg-[#fff] p-1 rounded" onClick={onGenerate}>
          Generate Detail
        </button>
      </div>
      <div className="bg-[#ffffff80] flex flex-col px-2 mt-6 rounded w-full py-4">
        <div className=" grid grid-cols-2 gap-x-6 gap-y-2 w-full ">
          <Field
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
              />
            </div>
          </div>

          <Field
            value={movieData.title}
            required
            name="Title"
            conf={{ onChange: (e) => onInputChange(e, "title") }}
          />
          <Field
            value={movieData.slug}
            required
            placeholder="title-year"
            name="Slug"
            conf={{ onChange: (e) => onInputChange(e, "slug") }}
          />
          <Field
            value={movieData.year}
            required
            name="Year"
            conf={{ onChange: (e) => onInputChange(e, "year") }}
          />
          <Field
            value={movieData.rated}
            name="Rated"
            conf={{ onChange: (e) => onInputChange(e, "rated") }}
          />
          <Field
            value={movieData.released}
            name="Released Date"
            placeholder="Ex. April 4, 2019"
            conf={{ onChange: (e) => onInputChange(e, "released") }}
          />
          <Field
            value={movieData.runtime}
            name="Runtime"
            conf={{ onChange: (e) => onInputChange(e, "runtime") }}
          />
          <Field
            value={convertRating(movieData.rating)}
            name="Rating"
            conf={{ onChange: (e) => onInputChange(e, "rating") }}
          />
          <Field
            value={movieData.imdbId}
            name="Imdb ID"
            conf={{ onChange: (e) => onInputChange(e, "imdbId") }}
          />

          <Field
            value={movieData.language}
            name="Language"
            conf={{ onChange: (e) => onInputChange(e, "language") }}
          />
          <Field
            value={movieData.country}
            name="Country"
            conf={{ onChange: (e) => onInputChange(e, "country") }}
          />
          <Field
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
              />
            </div>
          </div>
          {/* <Field
                  value={movieData.resolution}
                  name="Video Resolution"
                  conf={{ onChange: (e) => onInputChange(e, "resolution") }}
                /> */}
        </div>
        <div className="grid grid-cols-2 gap-6 w-full mt-2">
          <div className="flex flex-col">
            <label className="text-xl">Plot</label>
            <textarea
              value={movieData.plot}
              className="rounded outline-none p-2"
              onChange={(e) => onInputChange(e, "plot")}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <SeasonInput playerServerList={playerServerList} />
        <GenreInput />
        <CastInput type="Director" data={movieData.director} />
        <CastInput type="Writer" data={movieData.writer} />
        <CastInput type="Actor" data={movieData.actor} />
      </div>
      <Line thin />
      <button
        onClick={onCreate}
        className="bg-[#fff] w-full rounded p-2 mt-2 text-xl"
      >
        Create
      </button>
    </>
  );
}

export default CreateSeriesPanel;
