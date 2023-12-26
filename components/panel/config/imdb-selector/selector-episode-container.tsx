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

function SelectorEpisodeContainer({ imdbSelector }: Props) {
  const [selectorData, setSelectorData] = useState<ImdbSelector>(
    imdbSelector
      ? imdbSelector
      : {
          name: "episode",
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
        .patch(`/imdb-selector/update`, {
          selectorData: selectorData,
        })
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
        <h1 className="text-4xl">Episode Selector</h1>
        <button onClick={editHandler} className="bg-[#fff] rounded py-1 px-2">
          {edit ? "Edit" : "Save"}
        </button>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col w-[100%]">
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
            name="Main Title"
            value={selectorData.mainTitle}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "mainTitle");
              },
            }}
          />
          <Field
            disabled={edit}
            name="Episode Title"
            value={selectorData.episodeTitle}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "episodeTitle");
              },
            }}
          />
          <Field
            disabled={edit}
            name="Episode Array"
            value={selectorData.episodeArray}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "episodeArray");
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
            name="Poster"
            value={selectorData.poster}
            conf={{
              onChange(e) {
                onSelectorDataChange(e, "poster");
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectorEpisodeContainer;
