import type { MovieResponse } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { Metadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";
import { getMovieListByCountryPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const country = decodeURIComponent(params.category);
  const index = params.index;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/country/${country}/page/${index}`;
  const title = `Pilihan Genre ${country} Terlengkap - Moovie21`;
  const description = `Moovie21 - Nonton Film ${country}, Serial TV ${country}, Drakor ${country}, Anime ${country} terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`;
  const keywords = `Nonton Film ${country}, Nonton ${country} Gratis , Nonton Film ${country} Streaming, Moovie21, Nonton Drama ${country}, Nonton Anime ${country}, Subcountry Indonesia, Streaming Drakor ${country}, Streaming Anime ${country}`;
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
  });
}

async function GenreIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const title = decodeURIComponent(props.params.category);
  const { movie, movieLength }: MovieResponse = await getMovieListByCountryPage(
    pageIndex,
    title
  );
  return (
    <>
      <RootComponent>
        <PageContainer title={"FILM " + title}>
          <MovieContainer title="Film Terbaru">
            {movie?.map((movie, index) => {
              return <MovieCard key={index} data={movie} index={index} />;
            })}
          </MovieContainer>
          <Pagination
            movieLength={movieLength}
            moviePerPage={30}
            url={`/country/${title}/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default GenreIndexPage;
