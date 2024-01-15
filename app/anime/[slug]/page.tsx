import React from "react";
import PageContainer from "@/components/layouts/page-container";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { Movie } from "@/types/movie";
import EdsContainerTwoGrid from "@/components/eds/eds-container-two-grid";
import { convertSlugToTitle } from "@/utils/client-function/global";
import {
  getMovieBySlug,
  getRecomendarionMovie,
} from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import DetailSelection from "@/components/movie/detail/detail-selection";
import { Metadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";
import { redirect } from "next/navigation";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const slug = params.slug;
  const anime: Movie = await getMovieBySlug(slug, "anime");

  if (!anime) {
    redirect(process.env.NEXT_PUBLIC_BASE_URL + "/not-found");
  }
  const url = `/anime/${slug}`;
  const title = `Nonton ${anime.title} - Subtitle Indonesia - Moovie21`;
  const description = `Moovie21 - Nonton Film ${anime.title} sub indo dengan kualitas tinggi yang tersedia disitus, dalam subtitle bahasa indonesia. `;
  const keywords = `Nonton ${anime.title}, Nonton Film ${anime.title}, Nonton ${anime.title} Gratis, Nonton ${anime.title} Streaming, ${anime.title} Subtitle Indonesia`;
  const image = anime.poster;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
    // searchParams,
  });
}

async function StreamAnimePage(props: PageProps) {
  const slug = props.params.slug;
  const anime: Movie = await getMovieBySlug(slug, "anime");
  const recomendMovie: Movie[] = await getRecomendarionMovie(
    anime ? anime.genre : []
  );

  return (
    <>
      <RootComponent>
        <PageContainer>
          <EdsContainerTwoGrid />
          <DetailMovie data={anime} />
          <DetailSelection movie={anime} />
          <RecomendationMovie recomendMovie={recomendMovie} />
          <Note title={convertSlugToTitle(anime.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default StreamAnimePage;
