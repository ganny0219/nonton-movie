import type { Movie } from "@/types/movie";
import React, { useState } from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import FeaturedContainer from "@/components/movie/featured-container";
import CustomHead from "@/components/custom-head";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CustomSlider from "@/components/movie/custom-slider";
import { apiAxios } from "@/utils/axios";
import { getPageIndexParams } from "@/utils/server-function/global";
import { getMovieListPage } from "@/utils/server-function/movie";

type Props = {
  movie: Movie[];
  movieLength: number;
  pageIndex: number;
};

function MoviesIndexPage({ pageIndex, movie, movieLength }: Props) {
  return (
    <>
      <CustomHead
        title="Nonton Film, Movie, Box Office Terbaru dan Terlengkap Subtitle Indonesia - Nonton Movie"
        description="Nonton Movie - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus."
        keywords="Nonton Film, Nonton Gratis, Nonton Streaming, Nonton Movie, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime"
      />
      <RootComponent>
        <PageContainer title="CINEMAXXI">
          <MovieContainer title="FILM TERBARU">
            {movie?.map((movie, index) => {
              return <MovieCard key={index} data={movie} index={index} />;
            })}
          </MovieContainer>
          <Pagination
            movieLength={movieLength}
            moviePerPage={30}
            url={`/movie/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default MoviesIndexPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const pageIndex = getPageIndexParams(context);
    const { movie, movieLength } = await getMovieListPage(pageIndex, "movie");

    return {
      props: {
        movie,
        movieLength,
        pageIndex,
      },
      revalidate: 60,
    };
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
