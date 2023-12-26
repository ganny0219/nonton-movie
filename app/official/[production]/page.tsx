import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import CustomHead from "@/components/custom-head";
import { getMovieByOfficalPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import { MovieResponse } from "@/types/movie";

async function OfficialProductionPage(props: PageProps) {
  const productionName = props.params.production;
  const { movie, movieLength }: MovieResponse = await getMovieByOfficalPage(
    1,
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
                offset={1}
              />
            </>
          )}
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default OfficialProductionPage;
