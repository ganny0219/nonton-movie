import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { GetServerSideProps } from "next";
import { Movie, MovieResponse } from "@/types/movie";
import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import CustomHead from "@/components/custom-head";
import { getStringParams } from "@/utils/server-function/global";
import { getMovieBySearchPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";

async function SearchTitlePage(props: PageProps) {
  const searchInput = props.params.title;
  const { movie, movieLength }: MovieResponse = await getMovieBySearchPage(
    1,
    searchInput
  );
  return (
    <>
      {/* <CustomHead
        title={`Film ${searchInput} Terbaru - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${searchInput}, Serial TV ${searchInput}, Drakor ${searchInput}, Anime ${searchInput} sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film ${searchInput}, Nonton ${searchInput} Gratis , Nonton ${searchInput} Streaming, Nonton Movie,${searchInput} Subtitle Indonesia, ${searchInput}`}
      /> */}
      <RootComponent>
        <PageContainer title={`Pencarian: ${searchInput}`}>
          <MovieContainer title="Film Terbaru">
            {movie?.map((movie, index) => {
              return <MovieCard key={index} data={movie} index={index} />;
            })}
          </MovieContainer>
          <Pagination
            movieLength={movieLength}
            moviePerPage={30}
            url={`/search/${searchInput}/page`}
            offset={1}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default SearchTitlePage;
