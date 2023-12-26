import React from "react";
import RootPanel from "@/components/panel/root-panel";

import { getMovieListPanel } from "@/utils/server-function/movie";
import MoviePanel from "@/components/panel/movie/movie-panel";

async function DrakorPanelPage() {
  const drakor = await getMovieListPanel("drama-korea");
  return (
    <>
      <RootPanel selected="drama-korea">
        <MoviePanel movie={drakor} title="Drakor" type="drama-korea" />
      </RootPanel>
    </>
  );
}

export default DrakorPanelPage;
