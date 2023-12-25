import Line from "@/components/line";
import React, { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import axios from "axios";
import { Featured, FeaturedData } from "@/types/featured";
import { ImdbSelector } from "@/types/imdbSelector";
import Field from "@/components/field/field";
import { apiAxios } from "@/utils/axios";

type Props = {
  imdbSelector?: ImdbSelector;
};

function SelectorMovieContainer({ imdbSelector }: Props) {
  const [selectorData, setSelectorData] = useState<ImdbSelector>(
    imdbSelector
      ? imdbSelector
      : {
        name: "movie",
        cast: "",
        country: "",
        genre: "",
        language: "",
        plot: "",
        poster: "",
        rated: "",
        runtime: "",
        released: "",
        title: "",
        year: "",
        actorArray: "",
        actorAs: "",
        actorImage: "",
        actorName: "",
        director: "",
        episodeArray: "",
        episodeTitle: "",
        mainTitle: "",
        writer: "",
      }
  );
  const [edit, setEdit] = useState(true);
  const editHandler = async () => {
    if (edit == false) {
      await apiAxios
        .post(
          `/imdb-selector/update`,
          {
            selectorData: selectorData,
          },
        )
        .then((res) => res.data);
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  const onSelectorDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setSelectorData((prevData) => {
      return {
        ...prevData,
        [key]: e.target.value,
      };
    });
  };

  return (
    <div className="flex flex-col p-2 w-[80%] px-4 my-6 max-w-[1100px] m-auto bg-tertiary rounded-md">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-4xl">Movie Selector</h2>
        <button onClick={editHandler} className="bg-[#fff] rounded py-1 px-2">
          {edit ? "Edit" : "Save"}
        </button>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col w-[100%]">
          <Field
            disabled={edit}
            value={selectorData.country}
            name="Country"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "country");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.writer}
            name="Writer"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "writer");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.director}
            name="Director"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "director");
              },
            }}
          />

          <Field
            disabled={edit}
            value={selectorData.actorArray}
            name="Actor Array"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "actorArray");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.actorName}
            name="Actor Name"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "actorName");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.actorAs}
            name="Actor As"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "actorAs");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.actorImage}
            name="Actor Image"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "actorImage");
              },
            }}
          />
          <Field
            disabled={edit}
            name="Genre"
            value={selectorData.genre}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "genre");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.language}
            name="Language"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "language");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.mainTitle}
            name="Title"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "mainTitle");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.plot}
            name="Plot"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "plot");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.poster}
            name="Poster"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "poster");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.rated}
            name="Rated"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "rated");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.released}
            name="Released"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "released");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.runtime}
            name="Runtime"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "runtime");
              },
            }}
          />
          <Field
            disabled={edit}
            value={selectorData.year}
            name="Year"
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "year");
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectorMovieContainer;
