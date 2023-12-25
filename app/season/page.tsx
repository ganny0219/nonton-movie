import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { Season } from "@/types/movie";
import { GetServerSideProps, GetStaticProps } from "next";
import SeasonCard from "@/components/movie/season-card";
import CustomHead from "@/components/custom-head";

import { getSeasonListPage } from "@/utils/server-function/season";

type Props = {
  season: Season[];
  seasonLength: number;
};

function SeasonPage({ season, seasonLength }: Props) {
  return (
    <>
      <CustomHead
        title="Nonton Season Terbaru dari Serial TV, TV-Series, Serial TV Terbaru Subtitle Indonesia - Nonton Movie"
        description="Nonton Movie - Nonton Film, Serial TV Season Terbaru, Drakor Season Terbaru, Anime Season Terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari, semua tersedia disitus."
        keywords="Nonton Film, Nonton Gratis, Nonton Streaming, Nonton Movie, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime, Season Terbaru"
      />
      <RootComponent>
        <PageContainer title="SEASON SERIAL TV">
          {season.length > 0 && (
            <MovieContainer title="SEASON TERBARU">
              {season?.map((season, index) => {
                return (
                  <SeasonCard
                    key={index}
                    data={season}
                    index={index}
                    mainPage
                  />
                );
              })}
            </MovieContainer>
          )}
          <Pagination
            movieLength={seasonLength}
            moviePerPage={30}
            url={`/season/page`}
            offset={1}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default SeasonPage;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { season, seasonLength } = await getSeasonListPage(1, "");

    return {
      props: {
        season,
        seasonLength,
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: {},
      redirect: {
        permanent: true,
        destination: "/error",
      },
    };
  }
};
