"use client"
import type { Movie } from "@/types/movie";
import React, { useEffect, useState } from "react";

import Field from "@/components/field/field";
import Line from "@/components/line";
import CastInput from "@/components/panel/movie/cast-input";
import GenreInput from "@/components/panel/movie/genre-input";
import PlayerUrlInput from "@/components/panel/movie/player-url-input";
import RootPanel from "@/components/panel/root-panel";
import TrackInput from "@/components/panel/movie/track-input";
import Loading from "@/components/loading";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setMovieData, updateMovieData } from "@/store/movie";
import { GetServerSideProps } from "next";
import EditButton from "@/components/button/edit-button";
import { getSession } from "next-auth/react";
import { apiAxios } from "@/utils/axios";
import { convertRating } from "@/utils/client-function/global";
import { getMovieById } from "@/utils/server-function/movie";
import { getStringParams } from "@/utils/server-function/global";
import SingleSelectionRadio from "@/components/radio-button/single-selection-radio";
import { productionList, resolutionList } from "@/data/radio";
import {
  getPlayerServerListJson,
  getPlayerServerListPanel,
} from "@/utils/server-function/player-server";
import { PlayerServer, PlayerServerJson } from "@/types/player-server";

type Props = {
  movie: Movie;
  playerServerList: PlayerServer[];
  playerServerListJson: PlayerServerJson;
};

function UpdateMoviePage({ movie, playerServerListJson }: Props) {
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
      dispatch(setMovieData());
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
        .post(`/movie/update-detail`, {
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
      <RootPanel selected="movie">
        <div className="flex flex-col w-[80%] min-h-[100%] max-w-[1100px] m-auto bg-tertiary">
          <div
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
              }
            }}
            className="flex flex-col justify-center items-center px-4 mt-4 mb-2 pb-6"
          >
            <h1 className="text-3xl mb-2">UPDATE MOVIE</h1>
            <Line thin />
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
                      radioList={productionList.movie}
                      currentValue={movieData.production}
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
                    />
                  </div>
                </div>
                {/* <Field
                  disabled={editDetail}
                  value={movieData.resolution}
                  name="Video Resolution"
                  conf={{ onChange: (e) => onInputChange(e, "resolution") }}
                /> */}
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
              <PlayerUrlInput
                playerUrl={movieData.playerUrl}
                playerServerListJson={playerServerListJson}
                updateMode
              />
              <TrackInput
                movieId={movieData.id}
                movieSlug={movieData.slug}
                track={movieData.track}
                updateMode
              />
              <GenreInput updateMode />
              <CastInput type="Director" data={movieData.director} updateMode />
              <CastInput type="Writer" data={movieData.writer} updateMode />
              <CastInput type="Actor" data={movieData.actor} updateMode />
            </div>
          </div>
        </div>
      </RootPanel>
    </>
  );
}

export default UpdateMoviePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/pandora/auth",
      },
    };
  }

  const id = getStringParams(context, "id");
  const movie = await getMovieById(id);
  const playerServerList = await getPlayerServerListPanel();
  const playerServerListJson = await getPlayerServerListJson();

  if (movie) {
    return {
      props: {
        movie,
        playerServerList,
        playerServerListJson,
      },
    };
  } else {
    return {
      props: {},
      notFound: true,
    };
  }
};
