import React, { useEffect, useState } from "react";
import CastContainer from "@/components/cast/cast-container";
import PageContainer from "@/components/layouts/page-container";
import Line from "@/components/line";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Movie, PlayerUrl } from "@/types/movie";
import SelectButton from "@/components/button/select-button";
import Discussion from "@/components/discussion";
import AdsContainerOneGrid from "@/components/ads/ads-container-one-grid";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";
import CastCard from "@/components/cast/cast-card";
import { convertSlugToTitle } from "@/utils/client-function/global";
import PlayerList from "@/components/button/player-list";
import CustomHead from "@/components/custom-head";

import {
  getMovieBySlug,
  getRecomendarionMovie,
} from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import DetailSelection from "@/components/movie/detail/detail-selection";
import Player from "@/components/movie/player";

async function StreamMoviePage(props: PageProps) {
  const slug = props.params.slug;
  const movie: Movie = await getMovieBySlug(slug);
  const recomendMovie = await getRecomendarionMovie(movie.genre);

  return (
    <>
      {/* <CustomHead
        title={`Nonton ${movie.title} - Subtitle Indonesia - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${movie.title} sub indonesia sub indonesia dengan kualitas tinggi yang tersedia disitus, dalam bahasa indonesia. `}
        keywords={`Nonton ${movie.title}, Nonton Film ${movie.title}, Nonton ${movie.title} Gratis, Nonton ${movie.title} Streaming, ${movie.title} Subtitle Indonesia`}
      /> */}
      <RootComponent>
        <PageContainer>
          <AdsContainerTwoGrid />
          <Player playerUrl={movie.playerUrl} track={movie.track} />
          <AdsContainerOneGrid />
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
