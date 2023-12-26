import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { MovieResponse } from "@/types/movie";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";
import AdsContainerOneGrid from "@/components/ads/ads-container-one-grid";
import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import CustomHead from "@/components/custom-head";
import { getMovieByOfficalPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";

async function OfficialProductionIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const productionName = props.params.production;
  const { movie, movieLength }: MovieResponse = await getMovieByOfficalPage(
    pageIndex,
    productionName
  );
  return (
    <>
      <CustomHead
        title={`Film ${productionName} Terbaru - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${productionName}, Serial TV ${productionName}, Drakor ${productionName}, Anime ${productionName} terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film ${productionName}, Nonton ${productionName} Gratis , Nonton Film ${productionName} Streaming, Nonton Movie, Nonton Drama ${productionName}, Nonton Anime ${productionName}, Subtitle Indonesia, Streaming Drakor ${productionName}, Streaming Anime ${productionName}`}
      />
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
