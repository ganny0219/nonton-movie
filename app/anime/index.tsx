import type { Episode, Movie, Season } from "@/types/movie";
import type { GetStaticProps } from "next";
import React from "react";

import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import FeaturedContainer from "@/components/movie/featured-container";
import CustomHead from "@/components/custom-head";
import CustomSlider from "@/components/movie/custom-slider";

import EpisodeContainer from "@/components/movie/episode-container";
import { getEpisodeListPage } from "@/utils/server-function/episode";
import { getMovieListPage } from "@/utils/server-function/movie";
import { getFeatured } from "@/utils/server-function/featured";
import { getSeasonListPage } from "@/utils/server-function/season";

type Props = {
  anime: Movie[];
  animeLength: number;
  featuredAnime: Movie[];

  animeEpisode: Episode[];
  animeSeason: Season[];
};

function AnimePage({
  animeEpisode,
  anime,
  animeLength,
  featuredAnime,

  animeSeason,
}: Props) {
  return (
    <>
      <CustomHead
        title={`Pilihan Genre Anime Terlengkap - Nonton Movie`}
        description={`Nonton Movie - Nonton Film Anime, Serial TV Anime, Drakor Anime, Anime Anime terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film Anime, Nonton Anime Gratis , Nonton Film Anime Streaming, Nonton Movie, Nonton Drama Anime, Nonton Anime Anime, Subtitle Indonesia, Streaming Drakor Anime, Streaming Anime Anime`}
      />
      <RootComponent>
        <PageContainer title="FILM ANIME">
          {animeEpisode.length > 0 && (
            <EpisodeContainer
              seeAllpath="/episode/anime/page/1"
              episodeList={animeEpisode}
            />
          )}
          {featuredAnime.length > 0 && (
            <FeaturedContainer featuredMovie={featuredAnime} />
          )}
          {animeSeason.length > 0 && (
            <CustomSlider
              seasonList={animeSeason}
              title="SEASON TERBARU"
              urlSeeAll="/season/anime/page/1"
            />
          )}
          {anime.length > 0 && (
            <CustomSlider
              movieList={anime}
              title="ANIME TERBARU"
              urlSeeAll="/anime/page/1"
            />
          )}
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default AnimePage;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { movie: anime, movieLength: animeLength } = await getMovieListPage(
      1,
      "anime"
    );

    const animeEpisode = (await getEpisodeListPage(1, "anime")).episode.splice(
      0,
      12
    );

    const featuredAnime = await getFeatured("anime");

    const animeSeason = (await getSeasonListPage(1, "anime")).season.splice(
      0,
      12
    );
    return {
      props: {
        anime,
        animeLength,
        animeEpisode,
        animeSeason,
        featuredAnime,
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
