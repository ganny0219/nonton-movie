import type { MovieResponse } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { Metadata } from "next";
import CustomHead from "@/components/custom-head";
import { generateMetaResult } from "@/utils/server-function/global";
import { getMovieBySearchPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const index = params.index;
  const searchInput = params.title;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/search/${searchInput}/page/${index}`;
  const title = `Film ${searchInput} Terbaru - Nonton Movie`;
  const description = `Nonton Movie - Nonton Film ${searchInput}, Serial TV ${searchInput}, Drakor ${searchInput}, Anime ${searchInput} sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`;
  const keywords = `Nonton Film ${searchInput}, Nonton ${searchInput} Gratis , Nonton ${searchInput} Streaming, Nonton Movie,${searchInput} Subtitle Indonesia, ${searchInput}`;
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({ title, description, keywords, url, image });
}

async function SearchTitleIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const searchInput = props.params.title;
  const { movie, movieLength }: MovieResponse = await getMovieBySearchPage(
    pageIndex,
    searchInput
  );
  return (
    <>
      <RootComponent>
        <PageContainer title={`Pencarian: ${searchInput}`}>
          <MovieContainer title="Film Terbaru">
            {movie?.map((movie, index) => {
              return <MovieCard key={index} data={movie} index={index} />;
            })}
          </MovieContainer>
          <Pagination
            movieLength={movieLength}
            moviePerPage={30}
            url={`/search/${searchInput}/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default SearchTitleIndexPage;
