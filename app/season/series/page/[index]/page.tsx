import type { Season, SeasonResponse } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import SeasonCard from "@/components/movie/season-card";
import CustomHead from "@/components/custom-head";
import { getPageIndexParams } from "@/utils/server-function/global";
import { getSeasonListPage } from "@/utils/server-function/season";
import { PageProps } from "@/types/global";

async function SeasonIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const { season, seasonLength }: SeasonResponse = await getSeasonListPage(
    pageIndex,
    "series"
  );
  return (
    <>
      {/* <CustomHead
        title="Nonton Season Terbaru dari Serial TV, TV-Series, Serial TV Terbaru Subtitle Indonesia - Nonton Movie"
        description="Nonton Movie - Nonton Film, Serial TV Season Terbaru, Drakor Season Terbaru, Anime Season Terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari, semua tersedia disitus."
        keywords="Nonton Film, Nonton Gratis, Nonton Streaming, Nonton Movie, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime, Season Terbaru"
      /> */}
      <RootComponent>
        <PageContainer title="SEASON SERIAL TV">
          <MovieContainer title="SEASON TERBARU">
            {season?.map((season, index) => {
              return (
                <SeasonCard key={index} data={season} index={index} mainPage />
              );
            })}
          </MovieContainer>
          <Pagination
            movieLength={seasonLength}
            moviePerPage={30}
            url={`/season/series/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default SeasonIndexPage;
