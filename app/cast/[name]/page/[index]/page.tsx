import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { MovieResponse } from "@/types/movie";
import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import { getMovieByCastPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import { Metadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const index = params.index;
  const castName = decodeURIComponent(params.name);
  if (!castName) {
    redirect(process.env.NEXT_PUBLIC_BASE_URL + "/not-found");
  }
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/cast/${castName}/page/${index}`;
  const title = `Film ${castName} Terbaru - Moovie21`;
  const description = `Moovie21 - Nonton Film ${castName} sub indo dengan kualitas tinggi tersedia dalam subtitle bahasa indonesia.`;
  const keywords = `Nonton Film ${castName}, Nonton Film ${castName} Gratis , Nonton Film ${castName} Streaming, Moovie21, Subtitle Indonesia, ${castName}`;
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

export const dynamic = "force-static";
async function CastNameIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const castName = decodeURIComponent(props.params.name);
  const { movie, movieLength }: MovieResponse = await getMovieByCastPage(
    pageIndex,
    castName
  );
  return (
    <>
      <RootComponent>
        <PageContainer title={castName}>
          <MovieContainer title="Film Terbaru">
            {movie?.map((movie, index) => {
              return <MovieCard key={index} data={movie} index={index} />;
            })}
          </MovieContainer>
          <Pagination
            movieLength={movieLength}
            moviePerPage={30}
            url={`/search/${castName}/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default CastNameIndexPage;
