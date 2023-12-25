import type { Movie } from "@/types/movie";
import React, { useState } from "react";

import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { GetServerSideProps } from "next";
import axios from "axios";
import FeaturedContainer from "@/components/movie/featured-container";
import CustomHead from "@/components/custom-head";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import CustomSlider from "@/components/movie/custom-slider";
import { apiAxios } from "@/utils/axios";
import { isMobileServerCheck } from "@/utils/global-server-side";

type Props = {
  series: Movie[];
  seriesLength: number;
  featuredMovie: Movie[];
  pageIndex: number;
  isMobile: boolean;
};

function SeriesIndexPage({
  series,
  seriesLength,
  featuredMovie,
  pageIndex,
  isMobile,
}: Props) {
  return (
    <>
      <CustomHead
        title="Nonton Serial TV, TV-Series, Film Seri TV Terlengkap Subtitle Indonesia - 
        Nonton Movie"
        description="Nonton Movie - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus."
        keywords="Series Terbaru, Series, Nonton Film, Nonton Gratis, Nonton Streaming, Nonton Movie, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime"
      />
      <RootComponent>
        <PageContainer title="SERIAL TV">
          {/* {featuredMovie.length > 0 && (
            <FeaturedContainer
              featuredMovie={featuredMovie}
              isMobile={isMobile}
            />
          )} */}
          <MovieContainer title="SERIAL TV TERBARU">
            {series?.map((series, index) => {
              return (
                <MovieCard
                  key={index}
                  data={series}
                  index={index}
                  isMobile={isMobile}
                />
              );
            })}
          </MovieContainer>
          <Pagination
            movieLength={seriesLength}
            moviePerPage={30}
            url={`/series/page`}
            offset={pageIndex}
            isMobile={isMobile}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default SeriesIndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isMobile = isMobileServerCheck(context);
  const series = await apiAxios
    .get(`/series/get-page`, {
      params: {
        page: context.params?.index,
      },
    })
    .then((res) => res.data)
    .catch((err: Error) => console.log(err.message));
  const featuredMovie = await apiAxios
    .get(`/featured/get-series`)
    .then((res) => res.data)
    .catch((err: Error) => console.log(err.message));
  return {
    props: {
      series: series.series,
      seriesLength: series.seriesLength,
      featuredMovie: featuredMovie,
      pageIndex: context.params?.index,
      isMobile: isMobile,
    },
  };
};
