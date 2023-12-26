import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { GetStaticPaths, GetStaticProps } from "next";
import { Movie, MovieResponse } from "@/types/movie";
import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import CustomHead from "@/components/custom-head";
import { getMovieByCastPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";

async function CastNamePage(props: PageProps) {
  const castName = props.params.name;
  const { movie, movieLength }: MovieResponse = await getMovieByCastPage(
    1,
    castName
  );
  return (
    <>
      {/* <CustomHead
        title={`Film ${castName} Terbaru - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${castName} sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
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
            offset={1}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default CastNamePage;
