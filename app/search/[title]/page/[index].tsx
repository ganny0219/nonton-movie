import type { Movie } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { GetServerSideProps } from "next";
import CustomHead from "@/components/custom-head";
import {
  getPageIndexParams,
  getStringParams,
} from "@/utils/server-function/global";
import { getMovieBySearchPage } from "@/utils/server-function/movie";

type Props = {
  movie: Movie[];
  movieLength: number;
  searchInput: string;
  pageIndex: number;
};

function SearchTitleIndexPage({
  movie,
  movieLength,
  pageIndex,
  searchInput,
}: Props) {
  return (
    <>
      <CustomHead
        title={`Film ${searchInput} Terbaru - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${searchInput}, Serial TV ${searchInput}, Drakor ${searchInput}, Anime ${searchInput} sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film ${searchInput}, Nonton ${searchInput} Gratis , Nonton ${searchInput} Streaming, Nonton Movie,${searchInput} Subtitle Indonesia, ${searchInput}`}
      />

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
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default SearchTitleIndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const searchInput = getStringParams(context, "title");
    const pageIndex = getPageIndexParams(context);
    const { movie, movieLength } = await getMovieBySearchPage(
      pageIndex,
      searchInput
    );
    return {
      props: {
        movie,
        searchInput,
        movieLength,
        pageIndex,
      },
    };
  } catch {
    return {
      props: {},
      redirect: {
        permanent: true,
        destination: "/error",
      },
    };
  }
};
