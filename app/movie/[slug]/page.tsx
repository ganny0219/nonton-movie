import React from "react";
import PageContainer from "@/components/layouts/page-container";
import Line from "@/components/line";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { Metadata } from "next";
import { Movie } from "@/types/movie";
import Discussion from "@/components/discussion";
import EdsContainerOneGrid from "@/components/eds/eds-container-one-grid";
import EdsContainerTwoGrid from "@/components/eds/eds-container-two-grid";
import { convertSlugToTitle } from "@/utils/client-function/global";

import {
  getMovieBySlug,
  getRecomendarionMovie,
} from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import DetailSelection from "@/components/movie/detail/detail-selection";
import Player from "@/components/movie/player";
import { generateMetaResult } from "@/utils/server-function/global";
import { redirect } from "next/navigation";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const slug = params.slug;
  const movie: Movie = await getMovieBySlug(slug, "movie");
  if (!movie) {
    return {};
  }
  const url = `/movie/${slug}`;
  const title = `Nonton ${movie.title} - Subtitle Indonesia - Moovie21`;
  const description = `Moovie21 - Nonton Film ${movie.title} sub indo dengan kualitas tinggi yang tersedia disitus, dalam subtitle bahasa indonesia. `;
  const keywords = `Nonton ${movie.title}, Nonton Film ${movie.title}, Nonton ${movie.title} Gratis, Nonton ${movie.title} Streaming, ${movie.title} Subtitle Indonesia`;
  const image = movie.poster;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
    // searchParams,
  });
}

async function StreamMoviePage(props: PageProps) {
  const slug = props.params.slug;
  const searchParamsCount = Object.keys(props.searchParams).length;

  const movie: Movie = await getMovieBySlug(slug, "movie");

  if (!movie || searchParamsCount > 0) {
    return redirect(process.env.NEXT_PUBLIC_BASE_URL + "/not-found");
  }
  const recomendMovie = await getRecomendarionMovie(movie.genre);

  return (
    <>
      <RootComponent>
        <PageContainer>
          <EdsContainerTwoGrid />
          <Player playerUrl={movie.playerUrl} track={movie.track} />
          <EdsContainerOneGrid />
          <DetailMovie data={movie} />
          <DetailSelection movie={movie} movieType />
          <RecomendationMovie recomendMovie={recomendMovie} />
          <Discussion />
          <Line margin="4" />
          <Note title={convertSlugToTitle(movie.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default StreamMoviePage;
