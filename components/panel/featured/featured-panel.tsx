"use client";
import { Movie } from "@/types/movie";
import { FeaturedData } from "@/types/featured";

import React, { useState } from "react";
import FeaturedContainer from "@/components/panel/featured/featured-container";

type Props = {
  movie: Movie[];
  featuredDataDB: FeaturedData;
};

function FeaturedPanel({ movie, featuredDataDB }: Props) {
  const [FeaturedData, setFeaturedData] =
    useState<FeaturedData>(featuredDataDB);

  return (
    <>
      <FeaturedContainer
        title="Home"
        movie={movie}
        featuredData={FeaturedData.home}
        setFeaturedData={setFeaturedData}
      />
      <FeaturedContainer
        title="Movie"
        movie={movie}
        featuredData={FeaturedData.movie}
        setFeaturedData={setFeaturedData}
      />
      <FeaturedContainer
        title="Series"
        movie={movie}
        featuredData={FeaturedData.series}
        setFeaturedData={setFeaturedData}
      />
      <FeaturedContainer
        title="Anime"
        movie={movie}
        featuredData={FeaturedData.anime}
        setFeaturedData={setFeaturedData}
      />
      <FeaturedContainer
        title="Drakor"
        movie={movie}
        featuredData={FeaturedData.drakor}
        setFeaturedData={setFeaturedData}
      />
    </>
  );
}

export default FeaturedPanel;
