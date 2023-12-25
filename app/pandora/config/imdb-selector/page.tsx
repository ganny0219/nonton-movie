import Field from "@/components/field/field";
import FieldHorizontal from "@/components/field/field-horizontal";
import Line from "@/components/line";
import AdsItem from "@/components/panel/ads/ads-item";
import RootPanel from "@/components/panel/root-panel";
import movie from "@/pages/api/rss/movie";
import { Ads } from "@/types/ads";
import { Movie } from "@/types/movie";
import { FeaturedData } from "@/types/featured";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import FeaturedContainer from "@/components/panel/featured/featured-container";
import SelectorMovieContainer from "@/components/panel/config/imdb-selector/selector-movie-container";
import SelectorSeriesContainer from "@/components/panel/config/imdb-selector/selector-series-container";
import SelectorEpisodeContainer from "@/components/panel/config/imdb-selector/selector-episode-container";
import { ImdbSelectorData } from "@/types/imdbSelector";
import { apiAxios } from "@/utils/axios";
import { getImdbSelector } from "@/utils/server-function/selector";

type Props = {
  imdbSelectorDB: ImdbSelectorData;
};

function ImdbSelectorPage({ imdbSelectorDB }: Props) {
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
    <RootPanel selected="config">
      <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
        <h2 className="text-4xl">Selector List</h2>
      </div>
      <Line thin color="#00000050" />
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
    </RootPanel>
  );
}

export default ImdbSelectorPage;

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

  const imdbSelectorDB = await getImdbSelector("");

  return {
    props: {
      imdbSelectorDB: imdbSelectorDB,
    },
  };
};
