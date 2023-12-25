import type { Movie } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { GetServerSideProps, GetStaticProps } from "next";
import FeaturedContainer from "@/components/movie/featured-container";
import CustomHead from "@/components/custom-head";
import { apiAxios } from "@/utils/axios";

import { getFeatured } from "@/utils/server-function/featured";
import { getMovieListPage } from "@/utils/server-function/movie";

type Props = {
  movie: Movie[];
  movieLength: number;
  featuredMovie: Movie[];
};

function MoviesPage({ movie, movieLength, featuredMovie }: Props) {
  return (
    <>
      <CustomHead
        title="Nonton Film, Movie, Box Office Terbaru dan Terlengkap Subtitle Indonesia - Nonton Movie"
        description="Nonton Movie - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus."
        keywords="Nonton Film, Nonton Gratis, Nonton Streaming, Nonton Movie, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime"
      />
      <RootComponent>
        <PageContainer title="CINEMAXXI">
          {featuredMovie.length > 0 && (
            <FeaturedContainer featuredMovie={featuredMovie} />
          )}
          {movie.length > 0 && (
            <MovieContainer title="FILM TERBARU">
              {movie?.map((movie, index) => {
                return <MovieCard key={index} data={movie} index={index} />;
              })}
            </MovieContainer>
          )}
          <Pagination
            movieLength={movieLength}
            moviePerPage={30}
            url={`/movie/page`}
            offset={1}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default MoviesPage;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { movie, movieLength } = await getMovieListPage(1, "movie");
    const featuredMovie = await getFeatured("movie");

    return {
      props: {
        movie,
        movieLength,
        featuredMovie,
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
