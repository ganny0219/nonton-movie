import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import CustomSlider from "@/components/movie/custom-slider";
import EpisodeContainer from "@/components/movie/episode-container";
import { getMovieListPage } from "@/utils/server-function/movie";
import { getEpisodeListPage } from "@/utils/server-function/episode";
import { getFeatured } from "@/utils/server-function/featured";
import { getSeasonListPage } from "@/utils/server-function/season";
import FeaturedContainer from "@/components/movie/featured-container";

async function DramaKoreaPage() {
  const { movie: drakor, movieLength: drakorLength } = await getMovieListPage(
    1,
    "drama-korea"
  );

  const drakorEpisode = (
    await getEpisodeListPage(1, "drama-korea")
  ).episode.splice(0, 16);

  const featuredDrakor = await getFeatured("drakor");

  const drakorSeason = (
    await getSeasonListPage(1, "drama-korea")
  ).season.splice(0, 12);

  return (
    <>
      {/* <CustomHead
        title={`Pilihan Genre Drama Korea Terlengkap - Nonton Movie`}
        description={`Nonton Movie - Nonton Film Drama Korea, Serial TV Drama Korea, Drakor Drama Korea, Anime Drama Korea terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film Drama Korea, Nonton Drama Korea Gratis , Nonton Film Drama Korea Streaming, Nonton Movie, Nonton Drama Drama Korea, Nonton Anime Drama Korea, Subtitle Indonesia, Streaming Drakor Drama Korea, Streaming Anime Drama Korea`}
      /> */}
      <RootComponent>
        <PageContainer title="FILM DRAMA KOREA">
          {drakorEpisode.length > 0 && (
            <EpisodeContainer
              seeAllpath="/episode/drama-korea/page/1"
              episodeList={drakorEpisode}
            />
          )}
          {featuredDrakor.length > 0 && (
            <FeaturedContainer featuredMovie={featuredDrakor} />
          )}
          {drakorSeason.length > 0 && (
            <CustomSlider
              seasonList={drakorSeason}
              title="SEASON TERBARU"
              urlSeeAll="/season/drama-korea/page/1"
            />
          )}
          {drakor.length > 0 && (
            <CustomSlider
              movieList={drakor}
              title="DRAKOR TERBARU"
              urlSeeAll="/drama-korea/page/1"
            />
          )}
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default DramaKoreaPage;
