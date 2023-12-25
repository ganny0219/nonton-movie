import React, { useState } from "react";
import AdsContainer from "@/components/ads/ads-container-two-grid";
import AdsBannerItem from "@/components/ads/ads-banner-item";
import CastContainer from "@/components/cast/cast-container";
import CastItem from "@/components/cast/cast-card";
import PageContainer from "@/components/layouts/page-container";
import Line from "@/components/line";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { Movie } from "@/types/movie";
import SelectButton from "@/components/button/select-button";
import Season from "@/components/movie/season";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";

import AdsContainerOneGrid from "@/components/ads/ads-container-one-grid";
import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import CustomHead from "@/components/custom-head";
import { apiAxios } from "@/utils/axios";
import {
  getPageIndexParams,
  getStringParams,
} from "@/utils/server-function/global";
import { getMovieByOfficalPage } from "@/utils/server-function/movie";

type Props = {
  movie: Movie[];
  movieLength: number;
  pageIndex: number;
  productionName: string;
};

function OfficialProductionIndexPage({
  movie,
  productionName,
  movieLength,
  pageIndex,
}: Props) {
  return (
    <>
      <CustomHead
        title={`Film ${productionName} Terbaru - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${productionName}, Serial TV ${productionName}, Drakor ${productionName}, Anime ${productionName} terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film ${productionName}, Nonton ${productionName} Gratis , Nonton Film ${productionName} Streaming, Nonton Movie, Nonton Drama ${productionName}, Nonton Anime ${productionName}, Subtitle Indonesia, Streaming Drakor ${productionName}, Streaming Anime ${productionName}`}
      />
      <RootComponent>
        <PageContainer title={productionName}>
          {movie.length > 0 && (
            <>
              <MovieContainer title="Film Terbaru">
                {movie?.map((movie, index) => {
                  return <MovieCard key={index} data={movie} index={index} />;
                })}
              </MovieContainer>
              <Pagination
                movieLength={movieLength}
                moviePerPage={30}
                url={`/official/${productionName}/page`}
                offset={pageIndex}
              />
            </>
          )}
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default OfficialProductionIndexPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const pageIndex = getPageIndexParams(context);
    const productionName = getStringParams(context, "production");
    const { movie, movieLength } = await getMovieByOfficalPage(
      pageIndex,
      productionName
    );
    if (movie) {
      return {
        props: {
          movie,
          movieLength,
          productionName,
          pageIndex,
        },
        revalidate: 60,
      };
    } else {
      return {
        props: {},
        notFound: true,
      };
    }
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
