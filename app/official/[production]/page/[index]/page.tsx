import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { MovieResponse } from "@/types/movie";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";
import AdsContainerOneGrid from "@/components/ads/ads-container-one-grid";
import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import { getMovieByOfficalPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import { Metadata } from "next";
import { generateMetaResult } from "@/utils/server-function/global";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const index = params.index;
  const productionName = decodeURIComponent(params.production);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/official/${productionName}/page/${index}`;
  const title = `Film ${productionName} Terbaru - Moovie21`;
  const description = `Moovie21 - Nonton Film ${productionName}, Serial TV ${productionName}, Drakor ${productionName}, Anime ${productionName} terbaru sub indo dengan kualitas tinggi tersedia dalam subtitle bahasa indonesia.`;
  const keywords = `Nonton Film ${productionName}, Nonton ${productionName} Gratis , Nonton Film ${productionName} Streaming, Moovie21, Nonton Drama ${productionName}, Nonton Anime ${productionName}, Subtitle Indonesia, Streaming Drakor ${productionName}, Streaming Anime ${productionName}`;
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

async function OfficialProductionIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const productionName = decodeURIComponent(props.params.production);
  const { movie, movieLength }: MovieResponse = await getMovieByOfficalPage(
    pageIndex,
    productionName
  );
  return (
    <>
      <RootComponent>
        <PageContainer title={productionName}>
          {movie.length > 0 && (
            <>
              <MovieContainer title="Film Terbaru">
                {movie?.map((movie, index) => {
                  return <MovieCard key={index} data={movie} index={index} />;
                })}
              </MovieContainer>
              <Pagination
                movieLength={movieLength}
                moviePerPage={30}
                url={`/official/${productionName}/page`}
                offset={pageIndex}
              />
            </>
          )}
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default OfficialProductionIndexPage;
