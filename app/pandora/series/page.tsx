import React from "react";
import RootPanel from "@/components/panel/root-panel";
import { getMovieListPanel } from "@/utils/server-function/movie";
import MoviePanel from "@/components/panel/movie/movie-panel";
import { sessionCheck } from "@/utils/server-function/global";

async function MoviePanelPage() {
  const series = await getMovieListPanel("series");
  return (
    <>
      <RootPanel selected="series">
        <MoviePanel movie={series} title="Series" type="series" />
      </RootPanel>
    </>
  );
}

export default MoviePanelPage;
