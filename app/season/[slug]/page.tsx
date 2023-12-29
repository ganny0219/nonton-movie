import React from "react";
import PageContainer from "@/components/layouts/page-container";
import Line from "@/components/line";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { GetServerSideProps, Metadata } from "next";
import { Movie, Season } from "@/types/movie";
import EpisodeItem from "@/components/movie/episode-item";
import DetailSeason from "@/components/movie/detail/detail-season";
import { convertSlugToTitle } from "@/utils/client-function/global";
import CustomHead from "@/components/custom-head";
import {
  generateMetaResult,
  getStringParams,
} from "@/utils/server-function/global";
import { getSeasonBySlug } from "@/utils/server-function/season";
import { getRecomendarionMovie } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.slug;
  const season: Season = await getSeasonBySlug(slug);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/season/${slug}`;
  const title = `Nonton ${season?.movie?.title} : ${season.name} - Subtitle Indonesia - Moovie21`;
  const description = `Moovie21 - Nonton Film ${season?.movie?.title} : ${season.name} sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`;
  const keywords = `Nonton ${season?.movie?.title} : ${season.name}, Nonton Film ${season?.movie?.title} : ${season.name}, Nonton ${season?.movie?.title} : ${season.name} Gratis, Nonton ${season?.movie?.title} : ${season.name} Streaming, ${season?.movie?.title} : ${season.name} Subtitle Indonesia`;
  const image = season.poster;
  return generateMetaResult({ title, description, keywords, url, image });
}

async function StreamSeriesPage(props: PageProps) {
  const slug = props.params.slug;
  const season: Season = await getSeasonBySlug(slug);
  const recomendMovie = await getRecomendarionMovie(season.movie.genre);
  return (
    <>
      {/* <CustomHead
        title={`Nonton ${season?.movie?.title} :
        ${season.name} - Subtitle Indonesia - Moovie21`}
        description={`Moovie21 - Nonton Film ${season?.movie?.title} :
        ${season.name} sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton ${season?.movie?.title} :
        ${season.name}, Nonton Film ${season?.movie?.title} :
        ${season.name}, Nonton ${season?.movie?.title} :
        ${season.name} Gratis, Nonton ${season?.movie?.title} :
        ${season.name} Streaming, ${season?.movie?.title} :
        ${season.name} Subtitle Indonesia`}
      /> */}
      <RootComponent>
        <PageContainer>
          {/* <AdsContainerTwoGrid /> */}
          {season.trailerUrl && (
            <>
              <iframe
                className="w-full aspect-video"
                src={season.trailerUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="w-full border-t-2 border-dashed border-[#000] my-4" />
            </>
          )}
          {season.movie && <DetailSeason data={season} />}
          {/* <div className="w-full border-t-2 border-dashed border-[#000] my-4" />
        <Line margin="4" />
        <AdsContainerOneGrid /> */}
          <Line margin="4" />
          {/* <SelectedComponent /> */}
          {season.episode.map((episode, episodeIndex) => {
            return (
              <EpisodeItem
                seasonSquence={season.sequence}
                key={episodeIndex}
                episode={episode}
                episodeIndex={episodeIndex}
              />
            );
          })}
          <Line margin="4" />
          <RecomendationMovie recomendMovie={recomendMovie} />
          <Line margin="4" />
          <Note title={convertSlugToTitle(season.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default StreamSeriesPage;
