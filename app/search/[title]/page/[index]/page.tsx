import type { MovieResponse } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { Metadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";
import { getMovieBySearchPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import { redirect } from "next/navigation";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const index = params.index;
  const searchInput = decodeURIComponent(params.title);
  const url = `/search/${searchInput}/page/${index}`;
  const title = `Film ${searchInput} Terbaru - Moovie21`;
  const description = `Moovie21 - Nonton Film ${searchInput}, Serial TV ${searchInput}, Drakor ${searchInput}, Anime ${searchInput} sub indo dengan kualitas tinggi tersedia dalam subtitle bahasa indonesia.`;
  const keywords = `Nonton Film ${searchInput}, Nonton ${searchInput} Gratis , Nonton ${searchInput} Streaming, Moovie21,${searchInput} Subtitle Indonesia, ${searchInput}`;
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
    // searchParams,
  });
}

async function SearchTitleIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const searchInput = decodeURIComponent(props.params.title);

  if (!searchInput) {
    return redirect(process.env.NEXT_PUBLIC_BASE_URL + "/not-found");
  }
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
