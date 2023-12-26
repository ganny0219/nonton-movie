import Line from "@/components/line";
import RootPanel from "@/components/panel/root-panel";

import React from "react";
import { getFeaturedListPanel } from "@/utils/server-function/featured";
import { getMovieListPanel } from "@/utils/server-function/movie";
import FeaturedPanel from "@/components/panel/featured/featured-panel";

async function FeaturedPanelPage() {
  const movie = await getMovieListPanel("");
  const featuredDataDB = await getFeaturedListPanel();

  return (
    <RootPanel selected="featured">
      <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
        <h1 className="text-4xl">Featured List</h1>
      </div>
      <Line thin color="#00000050" />
      <FeaturedPanel movie={movie} featuredDataDB={featuredDataDB} />
    </RootPanel>
  );
}

export default FeaturedPanelPage;
