import type { SeasonResponse } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import SeasonCard from "@/components/movie/season-card";

import { getSeasonListPage } from "@/utils/server-function/season";
import { PageProps } from "@/types/global";
import { Metadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const index = params.index;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/season/series/page/${index}`;
  const title =
    "Nonton Season Terbaru dari Serial TV, TV-Series, Serial TV Terbaru Subtitle Indonesia - Moovie21";
  const description =
    "Moovie21 - Nonton Film, Serial TV Season Terbaru, Drakor Season Terbaru, Anime Season Terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari, semua tersedia disitus.";
  const keywords =
    "Nonton Film, Nonton Gratis, Nonton Streaming, Moovie21, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime, Season Terbaru";
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({ title, description, keywords, url, image });
}

async function SeasonIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const { season, seasonLength }: SeasonResponse = await getSeasonListPage(
    pageIndex,
    "series"
  );
  return (
    <>
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
