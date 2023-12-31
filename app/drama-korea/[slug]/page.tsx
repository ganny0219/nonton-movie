import React from "react";
import PageContainer from "@/components/layouts/page-container";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";
import { convertSlugToTitle } from "@/utils/client-function/global";
import CustomHead from "@/components/custom-head";
import {
  getMovieBySlug,
  getRecomendarionMovie,
} from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import DetailSelection from "@/components/movie/detail/detail-selection";
import { Metadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const slug = params.slug;
  const drakor = await getMovieBySlug(slug);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/drama-korea/${slug}`;
  const title = `Nonton ${drakor.title} - Subtitle Indonesia - Moovie21`;
  const description = `Moovie21 - Nonton Film ${drakor.title} sub indo dengan kualitas tinggi yang tersedia disitus, dalam subtitle bahasa indonesia. `;
  const keywords = `Nonton ${drakor.title}, Nonton Film ${drakor.title}, Nonton ${drakor.title} Gratis, Nonton ${drakor.title} Streaming, ${drakor.title} Subtitle Indonesia`;
  const image = drakor.poster;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
    searchParams,
  });
}
async function StreamDramaKoreaPage(props: PageProps) {
  const slug = props.params.slug;
  const drakor = await getMovieBySlug(slug);
  const recomendMovie = await getRecomendarionMovie(drakor ? drakor.genre : []);

  return (
    <>
      <RootComponent>
        <PageContainer>
          <AdsContainerTwoGrid />
          <DetailMovie data={drakor} />
          <DetailSelection movie={drakor} />
          <RecomendationMovie recomendMovie={recomendMovie} />
          <Note title={convertSlugToTitle(drakor.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default StreamDramaKoreaPage;
