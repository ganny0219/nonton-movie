import type { MovieResponse } from "@/types/movie";
import type { Metadata } from "next";
import React from "react";

import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import FeaturedContainer from "@/components/movie/featured-container";
import CustomSlider from "@/components/movie/custom-slider";

import EpisodeContainer from "@/components/movie/episode-container";
import { getEpisodeListPage } from "@/utils/server-function/episode";
import { getMovieListPage } from "@/utils/server-function/movie";
import { getFeatured } from "@/utils/server-function/featured";
import { getSeasonListPage } from "@/utils/server-function/season";
import { generateMetaResult } from "@/utils/server-function/global";
import { PageProps } from "@/types/global";
import { redirect } from "next/navigation";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const url = `/anime`;
  const title = `Pilihan Genre Anime Terlengkap - Moovie21`;
  const description = `Moovie21 - Nonton Film Anime, Serial TV Anime, Drakor Anime, Anime Anime terbaru sub indo dengan kualitas tinggi tersedia dalam subtitle bahasa indonesia.`;
  const keywords = `Nonton Film Anime, Nonton Anime Gratis , Nonton Film Anime Streaming, Moovie21, Nonton Drama Anime, Nonton Anime Anime, Subtitle Indonesia, Streaming Drakor Anime, Streaming Anime Anime`;
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
    // searchParams,
  });
}

async function AnimePage(props: PageProps) {
  const { movie: anime, movieLength: animeLength }: MovieResponse =
    await getMovieListPage(1, "anime");

  if (!anime) {
    return redirect(process.env.NEXT_PUBLIC_BASE_URL + "/not-found");
  }
  const animeEpisode = (await getEpisodeListPage(1, "anime")).episode.splice(
    0,
    12
  );

  const featuredAnime = await getFeatured("anime");

  const animeSeason = (await getSeasonListPage(1, "anime")).season.splice(
    0,
    12
  );
  return (
    <>
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
