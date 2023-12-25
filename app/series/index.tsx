import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { Episode, Movie, Season } from "@/types/movie";
import { GetStaticProps } from "next";
import FeaturedContainer from "@/components/movie/featured-container";
import CustomHead from "@/components/custom-head";
import CustomSlider from "@/components/movie/custom-slider";

import EpisodeContainer from "@/components/movie/episode-container";
import { getMovieListPage } from "@/utils/server-function/movie";
import { getEpisodeListPage } from "@/utils/server-function/episode";
import { getFeatured } from "@/utils/server-function/featured";
import { getSeasonListPage } from "@/utils/server-function/season";

type Props = {
  series: Movie[];
  seriesLength: number;
  featuredSeries: Movie[];
  seriesSeason: Season[];
  seriesEpisode: Episode[];
};

function SeriesPage({
  seriesEpisode,
  series,
  seriesLength,
  featuredSeries,
  seriesSeason,
}: Props) {
  return (
    <>
      <CustomHead
        title="Nonton Serial TV, TV-Series, Film Seri TV Terlengkap Subtitle Indonesia - 
        Nonton Movie"
        description="Nonton Movie - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus."
        keywords="Series Terbaru, Series, Nonton Film, Nonton Gratis, Nonton Streaming, Nonton Movie, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime"
      />
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

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { movie: series, movieLength: seriesLength } = await getMovieListPage(
      1,
      "series"
    );
    const seriesEpisode = (
      await getEpisodeListPage(1, "series")
    ).episode.splice(0, 12);
    const featuredSeries = await getFeatured("series");
    const seriesSeason = (await getSeasonListPage(1, "series")).season.splice(
      0,
      12
    );
    return {
      props: {
        series,
        seriesLength,
        seriesEpisode,
        seriesSeason,
        featuredSeries,
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
