import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { MovieResponse } from "@/types/movie";
import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import { getMovieBySearchPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import { Metadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const searchInput = decodeURIComponent(params.title);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/search/${searchInput}`;
  const title = `Film ${searchInput} Terbaru - Nonton Movie`;
  const description = `Nonton Movie - Nonton Film ${searchInput}, Serial TV ${searchInput}, Drakor ${searchInput}, Anime ${searchInput} sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`;
  const keywords = `Nonton Film ${searchInput}, Nonton ${searchInput} Gratis , Nonton ${searchInput} Streaming, Nonton Movie,${searchInput} Subtitle Indonesia, ${searchInput}`;
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({ title, description, keywords, url, image });
}
async function SearchTitlePage(props: PageProps) {
  const searchInput = decodeURIComponent(props.params.title);
  const { movie, movieLength }: MovieResponse = await getMovieBySearchPage(
    1,
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
            offset={1}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default SearchTitlePage;
