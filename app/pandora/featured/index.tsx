import Line from "@/components/line";
import RootPanel from "@/components/panel/root-panel";
import { Movie } from "@/types/movie";
import { FeaturedData } from "@/types/featured";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React, { useState } from "react";
import FeaturedContainer from "@/components/panel/featured/featured-container";
import {
  getFeatured,
  getFeaturedListPanel,
} from "@/utils/server-function/featured";
import { getMovieListPanel } from "@/utils/server-function/movie";

type Props = {
  movie: Movie[];
  featuredDataDB: FeaturedData;
};

function FeaturedPanelPage({ movie, featuredDataDB }: Props) {
  const [FeaturedData, setFeaturedData] =
    useState<FeaturedData>(featuredDataDB);

  return (
    <RootPanel selected="featured">
      <div className="flex flex-row justify-between items-center py-2 w-[80%] max-w-[1100px] m-auto">
        <h1 className="text-4xl">Featured List</h1>
      </div>
      <Line thin color="#00000050" />
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
    </RootPanel>
  );
}

export default FeaturedPanelPage;

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

  const movie = await getMovieListPanel("");
  const featuredDataDB = await getFeaturedListPanel();
  return {
    props: {
      movie,
      featuredDataDB,
    },
  };
};
