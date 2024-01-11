import React from "react";
import RootPanel from "@/components/panel/root-panel";

import { getMovieListPanel } from "@/utils/server-function/movie";
import MoviePanel from "@/components/panel/movie/movie-panel";

export const dynamic = "force-dynamic";
async function MoviePanelPage() {
  const anime = await getMovieListPanel("anime");
  return (
    <>
      <RootPanel selected="anime">
        <MoviePanel movie={anime} title="Anime" type="anime" />
      </RootPanel>
    </>
  );
}

export default MoviePanelPage;
