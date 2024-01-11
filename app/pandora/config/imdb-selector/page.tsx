import Line from "@/components/line";
import RootPanel from "@/components/panel/root-panel";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import SelectorMovieContainer from "@/components/panel/config/imdb-selector/selector-movie-container";
import SelectorSeriesContainer from "@/components/panel/config/imdb-selector/selector-series-container";
import SelectorEpisodeContainer from "@/components/panel/config/imdb-selector/selector-episode-container";
import { ImdbSelectorData } from "@/types/imdbSelector";
import { getImdbSelector } from "@/utils/server-function/selector";
import ImdbSelectorPanel from "@/components/panel/config/imdb-selector/imdb-selector-panel";
import { sessionCheck } from "@/utils/server-function/global";

export const dynamic = "force-dynamic";
async function ImdbSelectorPage() {
  const imdbSelectorDB = await getImdbSelector("");
  return (
    <RootPanel selected="config">
      <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
        <h2 className="text-4xl">Selector List</h2>
      </div>
      <Line thin color="#00000050" />
      <ImdbSelectorPanel imdbSelectorDB={imdbSelectorDB} />
    </RootPanel>
  );
}

export default ImdbSelectorPage;
