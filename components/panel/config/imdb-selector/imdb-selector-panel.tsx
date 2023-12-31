"use client";
import React, { useState } from "react";
import SelectorMovieContainer from "@/components/panel/config/imdb-selector/selector-movie-container";
import SelectorSeriesContainer from "@/components/panel/config/imdb-selector/selector-series-container";
import SelectorEpisodeContainer from "@/components/panel/config/imdb-selector/selector-episode-container";
import { ImdbSelectorData } from "@/types/imdbSelector";

type Props = {
  imdbSelectorDB: ImdbSelectorData;
};

function ImdbSelectorPanel({ imdbSelectorDB }: Props) {
  const [tab, setTab] = useState("Movie");

  const tabHandler = (key: string) => {
    setTab(key);
  };

  const SelectedTab = () => {
    if (tab == "Movie") {
      return (
        <SelectorMovieContainer
          imdbSelector={imdbSelectorDB.movie ? imdbSelectorDB.movie : undefined}
        />
      );
    } else if (tab == "Series") {
      return (
        <SelectorSeriesContainer
          imdbSelector={
            imdbSelectorDB.series ? imdbSelectorDB.series : undefined
          }
        />
      );
    } else {
      return (
        <SelectorEpisodeContainer
          imdbSelector={
            imdbSelectorDB.episode ? imdbSelectorDB.episode : undefined
          }
        />
      );
    }
  };
  return (
    <>
      <div className="grid grid-cols-3 px-2 bg-tertiary rounded text-xl py-2 shadow-lg w-[80%] max-w-[1100px] m-auto">
        <button
          className={`${tab == "Movie" ? "bg-[#fff] rounded" : ""}`}
          onClick={() => {
            tabHandler("Movie");
          }}
        >
          Movie
        </button>
        <button
          className={`${tab == "Series" ? "bg-[#fff] rounded" : ""}`}
          onClick={() => {
            tabHandler("Series");
          }}
        >
          Series
        </button>
        <button
          className={`${tab == "Episode" ? "bg-[#fff] rounded" : ""}`}
          onClick={() => {
            tabHandler("Episode");
          }}
        >
          Episode
        </button>
      </div>
      <SelectedTab />
    </>
  );
}

export default ImdbSelectorPanel;
