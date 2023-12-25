import type { Movie } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { GetStaticPaths, GetStaticProps } from "next";
import CustomHead from "@/components/custom-head";
import {
  getPageIndexParams,
  getStringParams,
} from "@/utils/server-function/global";
import { getMovieListByCountryPage } from "@/utils/server-function/movie";

type Props = {
  title: string;
  movie: Movie[];
  movieLength: number;
  pageIndex: number;
};

function GenreIndexPage({ movie, title, movieLength, pageIndex }: Props) {
  return (
    <>
      <CustomHead
        title={`Pilihan Genre ${title} Terlengkap - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${title}, Serial TV ${title}, Drakor ${title}, Anime ${title} terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film ${title}, Nonton ${title} Gratis , Nonton Film ${title} Streaming, Nonton Movie, Nonton Drama ${title}, Nonton Anime ${title}, Subtitle Indonesia, Streaming Drakor ${title}, Streaming Anime ${title}`}
      />
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
            url={`/country/${title}/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default GenreIndexPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const pageIndex = getPageIndexParams(context);
    const country = getStringParams(context, "category");
    const { movie, movieLength } = await getMovieListByCountryPage(
      pageIndex,
      country
    );
    return {
      props: {
        title: country,
        pageIndex,
        movie,
        movieLength,
      },
      revalidate: 60,
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
