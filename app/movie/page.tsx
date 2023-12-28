import type { MovieResponse } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import FeaturedContainer from "@/components/movie/featured-container";

import { getFeatured } from "@/utils/server-function/featured";
import { getMovieListPage } from "@/utils/server-function/movie";
import { Metadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";
import { PageProps } from "@/types/global";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/movie`;
  const title =
    "Nonton Film, Movie, Box Office Terbaru dan Terlengkap Subtitle Indonesia - Moovie21";
  const description =
    "Moovie21 - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus.";
  const keywords =
    "Nonton Film, Nonton Gratis, Nonton Streaming, Moovie21, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime";
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({ title, description, keywords, url, image });
}

async function MoviesPage() {
  const { movie, movieLength }: MovieResponse = await getMovieListPage(
    1,
    "movie"
  );
  const featuredMovie = await getFeatured("movie");
  return (
    <>
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
