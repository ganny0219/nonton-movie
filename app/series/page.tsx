import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";

import FeaturedContainer from "@/components/movie/featured-container";

import CustomSlider from "@/components/movie/custom-slider";

import EpisodeContainer from "@/components/movie/episode-container";
import { getMovieListPage } from "@/utils/server-function/movie";
import { getEpisodeListPage } from "@/utils/server-function/episode";
import { getFeatured } from "@/utils/server-function/featured";
import { getSeasonListPage } from "@/utils/server-function/season";
import { PageProps } from "@/types/global";
import { Metadata, ResolvingMetadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/series`;
  const title =
    "Nonton Serial TV, TV-Series, Film Seri TV Terlengkap Subtitle Indonesia - Moovie21";
  const description =
    "Moovie21 - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus.";
  const keywords =
    "Series Terbaru, Series, Nonton Film, Nonton Gratis, Nonton Streaming, Moovie21, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime";
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({ title, description, keywords, url, image });
}

async function SeriesPage() {
  const { movie: series, movieLength: seriesLength } = await getMovieListPage(
    1,
    "series"
  );
  const seriesEpisode = (await getEpisodeListPage(1, "series")).episode.splice(
    0,
    12
  );
  const featuredSeries = await getFeatured("series");
  const seriesSeason = (await getSeasonListPage(1, "series")).season.splice(
    0,
    12
  );
  return (
    <>
      <RootComponent>
        <PageContainer title="SERIAL TV">
          {seriesEpisode.length > 0 && (
            <EpisodeContainer
              seeAllpath="/episode/series/page/1"
              episodeList={seriesEpisode}
            />
          )}
          {featuredSeries.length > 0 && (
            <FeaturedContainer featuredMovie={featuredSeries} />
          )}
          {seriesSeason.length > 0 && (
            <CustomSlider
              seasonList={seriesSeason}
              title="SEASON TERBARU"
              urlSeeAll="/season/series/page/1"
            />
          )}
          {series.length > 0 && (
            <CustomSlider
              movieList={series}
              title="SERIES TERBARU"
              urlSeeAll="/series/page/1"
            />
          )}
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default SeriesPage;
