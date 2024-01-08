import type { MovieResponse } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { getMovieListPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import { generateMetaResult } from "@/utils/server-function/global";
import { Metadata } from "next";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const index = params.index;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/drama-korea/page/${index}`;
  const title = `Pilihan Genre Drama Korea Terlengkap - Moovie21`;
  const description = `Moovie21 - Nonton Film Drama Korea, Serial TV Drama Korea, Drakor Drama Korea, Anime Drama Korea terbaru sub indo dengan kualitas tinggi tersedia dalam subtitle bahasa indonesia.`;
  const keywords = `Nonton Film Drama Korea, Nonton Drama Korea Gratis , Nonton Film Drama Korea Streaming, Moovie21, Nonton Drama Drama Korea, Nonton Anime Drama Korea, Subtitle Indonesia, Streaming Drakor Drama Korea, Streaming Anime Drama Korea`;
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
    searchParams,
  });
}

async function DramaKoreaIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const { movie: drakor, movieLength: drakorLength }: MovieResponse =
    await getMovieListPage(pageIndex, "drama-korea");

  return (
    <>
      <RootComponent>
        <PageContainer title="FILM DRAMA KOREA">
          <MovieContainer title="DRAMA TERBARU">
            {drakor?.map((drakor, index) => {
              return <MovieCard key={index} data={drakor} index={index} />;
            })}
          </MovieContainer>
          <Pagination
            movieLength={drakorLength}
            moviePerPage={30}
            url={`/drama-korea/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default DramaKoreaIndexPage;
