import type { MovieResponse } from "@/types/movie";
import type { Metadata } from "next";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";

import { generateMetaResult } from "@/utils/server-function/global";
import { getMovieListByGenrePage } from "@/utils/server-function/genre";
import { PageProps } from "@/types/global";
import { redirect } from "next/navigation";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const title = decodeURIComponent(params.category);
  if (!title) {
    return {};
  }
  const url = `/genre/${title}`;
  const metaTitle = `Pilihan Genre ${title} Terlengkap - Moovie21`;
  const description = `Moovie21 - Nonton Film ${title}, Serial TV ${title}, Drakor ${title}, Anime ${title} terbaru sub indo dengan kualitas tinggi tersedia dalam subtitle bahasa indonesia.`;
  const keywords = `Nonton Film ${title}, Nonton ${title} Gratis , Nonton Film ${title} Streaming, Moovie21, Nonton Drama ${title}, Nonton Anime ${title}, Subtitle Indonesia, Streaming Drakor ${title}, Streaming Anime ${title}`;
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({
    title: metaTitle,
    description,
    keywords,
    url,
    image,
    // searchParams,
  });
}

async function CategoryPage(props: PageProps) {
  const title = props.params.category;

  if (!title) {
    return redirect(process.env.NEXT_PUBLIC_BASE_URL + "/not-found");
  }
  const { movie, movieLength }: MovieResponse = await getMovieListByGenrePage(
    title,
    1
  );
  return (
    <>
      <RootComponent>
        <PageContainer title={"FILM " + title}>
          {movie.length > 0 && (
            <MovieContainer title="Film Terbaru">
              {movie?.map((movie, index) => {
                return <MovieCard key={index} data={movie} index={index} />;
              })}
            </MovieContainer>
          )}
          <Pagination
            movieLength={movieLength}
            moviePerPage={30}
            url={`/genre/${title}/page`}
            offset={1}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default CategoryPage;
