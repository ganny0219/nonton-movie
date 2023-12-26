import React from "react";
import PageContainer from "@/components/layouts/page-container";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { Movie } from "@/types/movie";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";
import { convertSlugToTitle } from "@/utils/client-function/global";
import CustomHead from "@/components/custom-head";
import {
  getMovieBySlug,
  getRecomendarionMovie,
} from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import DetailSelection from "@/components/movie/detail/detail-selection";

async function StreamAnimePage(props: PageProps) {
  const slug = props.params.slug;
  const anime: Movie = await getMovieBySlug(slug);
  const recomendMovie: Movie[] = await getRecomendarionMovie(
    anime ? anime.genre : []
  );

  return (
    <>
      {/* <CustomHead
        title={`Nonton ${anime.title} - Subtitle Indonesia - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${anime.title} sub indonesia sub indonesia dengan kualitas tinggi yang tersedia disitus, dalam bahasa indonesia. `}
        keywords={`Nonton ${anime.title}, Nonton Film ${anime.title}, Nonton ${anime.title} Gratis, Nonton ${anime.title} Streaming, ${anime.title} Subtitle Indonesia`}
      /> */}
      <RootComponent>
        <PageContainer>
          <AdsContainerTwoGrid />
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
