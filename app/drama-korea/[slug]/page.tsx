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

async function StreamDramaKoreaPage(props: PageProps) {
  const slug = props.params.slug;
  const drakor = await getMovieBySlug(slug);
  const recomendMovie = await getRecomendarionMovie(drakor ? drakor.genre : []);

  return (
    <>
      {/* <CustomHead
        title={`Nonton ${drakor.title} - Subtitle Indonesia - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${drakor.title} sub indonesia sub indonesia dengan kualitas tinggi yang tersedia disitus, dalam bahasa indonesia. `}
        keywords={`Nonton ${drakor.title}, Nonton Film ${drakor.title}, Nonton ${drakor.title} Gratis, Nonton ${drakor.title} Streaming, ${drakor.title} Subtitle Indonesia`}
      /> */}
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
