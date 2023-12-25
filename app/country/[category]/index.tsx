import type { Movie } from "@/types/movie";
import type { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import CustomHead from "@/components/custom-head";
import { getStringParams } from "@/utils/server-function/global";
import { getMovieListByCountryPage } from "@/utils/server-function/movie";

type Props = {
  title: string;
  movie: Movie[];
  movieLength: number;
};

function CategoryPage({ title, movie, movieLength }: Props) {
  return (
    <>
      <CustomHead
        title={`Pilihan Genre ${title} Terlengkap - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${title}, Serial TV ${title}, Drakor ${title}, Anime ${title} terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film ${title}, Nonton ${title} Gratis , Nonton Film ${title} Streaming, Nonton Movie, Nonton Drama ${title}, Nonton Anime ${title}, Subtitle Indonesia, Streaming Drakor ${title}, Streaming Anime ${title}`}
      />
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
            url={`/country/${title}/page`}
            offset={1}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default CategoryPage;
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const country = getStringParams(context, "category");
    const { movie, movieLength } = await getMovieListByCountryPage(1, country);

    return {
      props: {
        title: country,
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
