import React from "react";

import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { MovieResponse } from "@/types/movie";
import { getMovieListPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import { Metadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const index = params.index;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/series/page/${index}`;
  const title =
    "Nonton Serial TV, TV-Series, Film Seri TV Terlengkap Subtitle Indonesia - Moovie21";
  const description =
    "Moovie21 - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus.";
  const keywords =
    "Series Terbaru, Series, Nonton Film, Nonton Gratis, Nonton Streaming, Moovie21, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime";
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

async function SeriesIndexPage(props: PageProps) {
  const pageIndex = props.params?.index;
  const { movie: series, movieLength: seriesLength }: MovieResponse =
    await getMovieListPage(pageIndex, "series");
  // const featuredMovie = await apiAxios
  //   .get(`/featured/get-series`)
  //   .then((res) => res.data)
  //   .catch((err: Error) => console.log(err.message));
  return (
    <>
      <RootComponent>
        <PageContainer title="SERIAL TV">
          {/* {featuredMovie.length > 0 && (
            <FeaturedContainer
              featuredMovie={featuredMovie}
            />
          )} */}
          <MovieContainer title="SERIAL TV TERBARU">
            {series?.map((series, index) => {
              return <MovieCard key={index} data={series} index={index} />;
            })}
          </MovieContainer>
          <Pagination
            movieLength={seriesLength}
            moviePerPage={30}
            url={`/series/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default SeriesIndexPage;
