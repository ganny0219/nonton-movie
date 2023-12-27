import type { MovieResponse } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import CustomHead from "@/components/custom-head";
import { getMovieListByGenrePage } from "@/utils/server-function/genre";
import { PageProps } from "@/types/global";
import { generateMetaResult } from "@/utils/server-function/global";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const title = params.category;
  const index = params.index;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/genre/${title}/page/${index}`;
  const metaTitle = `Pilihan Genre ${title} Terlengkap - Nonton Movie`;
  const description = `Nonton Movie - Nonton Film ${title}, Serial TV ${title}, Drakor ${title}, Anime ${title} terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`;
  const keywords = `Nonton Film ${title}, Nonton ${title} Gratis , Nonton Film ${title} Streaming, Nonton Movie, Nonton Drama ${title}, Nonton Anime ${title}, Subtitle Indonesia, Streaming Drakor ${title}, Streaming Anime ${title}`;
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({
    title: metaTitle,
    description,
    keywords,
    url,
    image,
  });
}

async function GenreIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const title = props.params.category;
  const { movie, movieLength }: MovieResponse = await getMovieListByGenrePage(
    title,
    pageIndex
  );
  return (
    <>
      {/* <CustomHead
        title={`Pilihan Genre ${title} Terlengkap - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${title}, Serial TV ${title}, Drakor ${title}, Anime ${title} terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film ${title}, Nonton ${title} Gratis , Nonton Film ${title} Streaming, Nonton Movie, Nonton Drama ${title}, Nonton Anime ${title}, Subtitle Indonesia, Streaming Drakor ${title}, Streaming Anime ${title}`}
      /> */}
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
            url={`/genre/${title}/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default GenreIndexPage;
