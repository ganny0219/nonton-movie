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

function SelectorSeriesContainer({ imdbSelector }: Props) {
  const [selectorData, setSelectorData] = useState<ImdbSelector>(
    imdbSelector
      ? imdbSelector
      : {
        name: "series",
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
        .patch(
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
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-4xl">Series Selector</h1>
        <button onClick={editHandler} className="bg-[#fff] rounded py-1 px-2">
          {edit ? "Edit" : "Save"}
        </button>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col w-[100%]">
          <Field
            disabled={edit}
            name="Country"
            value={selectorData.country}
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
            name="Language"
            value={selectorData.language}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "language");
              },
            }}
          />
          <Field
            disabled={edit}
            name="Poster"
            value={selectorData.poster}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "poster");
              },
            }}
          />
          <Field
            disabled={edit}
            name="Plot"
            value={selectorData.plot}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "plot");
              },
            }}
          />
          <Field
            disabled={edit}
            name="Rated"
            value={selectorData.rated}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "rated");
              },
            }}
          />
          <Field
            disabled={edit}
            name="Runtime"
            value={selectorData.runtime}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "runtime");
              },
            }}
          />
          <Field
            disabled={edit}
            name="Released"
            value={selectorData.released}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "released");
              },
            }}
          />
          <Field
            disabled={edit}
            name="Title"
            value={selectorData.mainTitle}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "mainTitle");
              },
            }}
          />
          <Field
            disabled={edit}
            name="Year"
            value={selectorData.year}
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

export default SelectorSeriesContainer;
