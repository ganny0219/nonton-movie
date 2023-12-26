import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { MovieResponse } from "@/types/movie";
import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import CustomHead from "@/components/custom-head";
import { getMovieByCastPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";

async function CastNameIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const castName = props.params.name;
  const { movie, movieLength }: MovieResponse = await getMovieByCastPage(
    pageIndex,
    castName
  );
  return (
    <>
      {/* <CustomHead
        title={`Film ${castName} Terbaru - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${castName} dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari, semua tersedia disitus.`}
        keywords={`Nonton Film ${castName}, Nonton Film ${castName} Gratis , Nonton Film ${castName} Streaming, Nonton Movie, Subtitle Indonesia, ${castName}`}
      /> */}
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
